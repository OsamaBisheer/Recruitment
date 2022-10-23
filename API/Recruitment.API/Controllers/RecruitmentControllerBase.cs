using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace Recruitment.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecruitmentControllerBase : ControllerBase
    {
        protected int GetCustomerId()
        {
            try
            {
                return int.Parse(GetClaimValue(new IdentityOptions().ClaimsIdentity.UserNameClaimType));
            }
            catch
            {
                return -1;
            }
        }

        protected string GetClaimValue(string claimType)
        {
            string resolvedID = null;
            try
            {
                resolvedID = User.Claims.First(i => i.Type == claimType).Value;
            }
            catch
            {
                resolvedID = null;
            }

            return resolvedID;
        }
    }

    [Authorize(Policy = "Admin")]
    public class AdminControllerBase : RecruitmentControllerBase
    {
        protected string GetAdminId()
        {
            return GetClaimValue(new IdentityOptions().ClaimsIdentity.UserIdClaimType);
        }

        protected string GetAdminName()
        {
            return GetClaimValue(new IdentityOptions().ClaimsIdentity.UserNameClaimType);
        }
    }

    [Authorize(Policy = "EndUser")]
    public class EndUserControllerBase : RecruitmentControllerBase
    {
        protected string GetEndUserId()
        {
            return GetClaimValue(new IdentityOptions().ClaimsIdentity.UserIdClaimType);
        }

        protected string GetEndUserName()
        {
            return GetClaimValue(new IdentityOptions().ClaimsIdentity.UserNameClaimType);
        }
    }
}