using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Recruitment.Domain.Entities;
using Recruitment.Domain.ViewModels;
using Recruitment.Repository.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Recruitment.API.Controllers
{
    [Route("api/end-users")]
    [ApiController]
    [AllowAnonymous]
    public class EndUserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _config;
        private readonly IUnitOfWork _unitOfWork;

        public EndUserController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration config, IUnitOfWork unitOfWork)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
            _unitOfWork = unitOfWork;
        }

        [HttpPost("login")]
        public ResponseModel Login(CustomerLoginRequestModel loginModel)
        {
            var error = loginModel.Validate();
            if (error != null) return (new FailureResponseModel { Message = error });

            var user = _userManager.Users.FirstOrDefault(u => u.Email == loginModel.Email);
            if (user == null) return (new FailureResponseModel { Message = "Invalid Email Or Password" });
            if (!user.IsEnabled) return (new FailureResponseModel { Message = "Account Blocked" });

            var signInResult = _signInManager.PasswordSignInAsync(user, loginModel.Password, true, true).Result;
            if (signInResult.IsLockedOut) return (new FailureResponseModel { Message = "Account Locked" });
            if (!signInResult.Succeeded) return (new FailureResponseModel { Message = "Invalid Email Or Password" });

            var userRoles = _userManager.GetRolesAsync(user).Result;

            var customer = _unitOfWork.Customers.Get(c => c.Id == user.CustomerId && !c.IsDeleted).FirstOrDefault();
            if (customer == null) return new FailureResponseModel { Message = "Invalid Email Or Password" };

            var tokenString = GetEndUserToken(customer, userRoles);

            var response = new LoginSuccessModel
            {
                Token = tokenString,
                Username = customer.Name,
            };

            return new SuccessResponseModel { Result = response };
        }

        private string GetEndUserToken(Customer customer, IList<string> userRoles)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["jwt:secretKey"]));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var options = new IdentityOptions();
            var claims = new List<Claim>
            {
                new Claim(options.ClaimsIdentity.UserIdClaimType, customer.Id.ToString()),
                new Claim(options.ClaimsIdentity.UserNameClaimType, customer.Name),
                new Claim(ClaimTypes.Role, "EndUser"),
            };

            claims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

            var tokeOptions = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(Convert.ToInt32(_config["jwt:expiresInHours"])),
                signingCredentials: signinCredentials,
                issuer: _config["jwt:Issuer"]
            );

            return new JwtSecurityTokenHandler().WriteToken(tokeOptions);
        }

        [HttpPost("register")]
        public ResponseModel Create(CustomerModel registerModel)
        {
            var isExist = _unitOfWork.Customers.Get(c => c.Email == registerModel.Email && !c.IsDeleted).Any();
            if (isExist) return new FailureResponseModel { Message = "Email is already registered" };

            var customer = Customer.Create(registerModel);
            var user = Domain.Entities.User.Create(registerModel);

            _unitOfWork.Customers.Add(customer);
            _unitOfWork.Commit();

            user.CustomerId = customer.Id;

            var result = _userManager.CreateAsync(user, registerModel.Password).Result;
            if (!result.Succeeded) return new FailureResponseModel() { Message = result.Errors.ToArray()[0].Description };

            _unitOfWork.Commit();

            return new SuccessResponseModel();
        }
    }
}