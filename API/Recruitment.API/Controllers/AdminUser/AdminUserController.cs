using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Recruitment.Domain.Entities;
using Recruitment.Domain.ViewModels;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Recruitment.API.Controllers
{
    [Route("api/admin/users")]
    [ApiController]
    [AllowAnonymous]
    public class AdminUserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _config;

        public AdminUserController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration config)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AdminLoginRequestModel loginRequestModel)
        {
            var error = loginRequestModel.Validate();
            if (error != null) return Ok(new FailureResponseModel { Message = error });

            var user = await _userManager.FindByNameAsync(loginRequestModel.UserName);
            if (user == null) return Ok(new FailureResponseModel { Message = "Invalid Username or Password" });
            if (user.CustomerId != 0) return Ok(new FailureResponseModel { Message = "Not Allowed" });
            if (user.IsEnabled == false) return Ok(new FailureResponseModel { Message = "Your account has been locked contact the administrator" });

            var signInResult = _signInManager.PasswordSignInAsync(user, loginRequestModel.Password, true, false).Result;
            if (!signInResult.Succeeded) return Ok(new FailureResponseModel { Message = "Invalid Username or Password" });

            var userRoles = _userManager.GetRolesAsync(user).Result;

            var tokenString = GetAdminUserToken(user, userRoles);

            var response = new LoginSuccessModel
            {
                Token = tokenString,
                Username = user.UserName,
            };

            return Ok(new SuccessResponseModel { Message = "Login Success", Result = response });
        }

        private string GetAdminUserToken(User user, IList<string> userRoles)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["jwt:secretKey"]));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var options = new IdentityOptions();
            var claims = new List<Claim>
            {
                new Claim(options.ClaimsIdentity.UserIdClaimType, user.Id),
                new Claim(options.ClaimsIdentity.UserNameClaimType, user.UserName),
                new Claim(ClaimTypes.Role, "Admin"),
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
    }
}