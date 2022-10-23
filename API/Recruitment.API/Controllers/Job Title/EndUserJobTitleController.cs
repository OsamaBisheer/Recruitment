using DelegateDecompiler;
using Microsoft.AspNetCore.Mvc;
using Recruitment.Domain.Entities;
using Recruitment.Domain.Utilities;
using Recruitment.Domain.ViewModels;
using Recruitment.Repository.Common;

namespace Recruitment.API.Controllers
{
    [Route("api/end-users-job-titles")]
    public class EndUserJobTitleController : EndUserControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public EndUserJobTitleController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public IActionResult GetJobTitles()
        {
            var jobTitle = _unitOfWork.JobTitles.Get(jt => !jt.IsDeleted).Decompile().Select(jt => JobTitleModel.Create(jt)).ToList();
            return Ok(new SuccessResponseModel { Result = jobTitle });
        }

        [HttpPost("{id}")]
        public IActionResult AddCustomerJobTitle([FromRoute] int id)
        {
            var jobTitle = _unitOfWork.JobTitles.Get(jt => jt.Id == id && !jt.IsDeleted).Decompile().Select(jt => JobTitleModel.Create(jt)).FirstOrDefault();

            if (jobTitle == null) return Ok(new FailureResponseModel { Message = "Not found" });
            if (DateUtility.IsFirstLower(DateTime.UtcNow, jobTitle.From)) return Ok(new FailureResponseModel { Message = "Job Title Unreleased" });
            if (DateUtility.IsFirstHigher(DateTime.UtcNow, jobTitle.To)) return Ok(new FailureResponseModel { Message = "Job Title Expired" });

            var submittedAppsCount = _unitOfWork.CustomersJobTitles.Get(cjt => cjt.JobTitleId == id && !cjt.IsDeleted).Count();
            if (submittedAppsCount == jobTitle.MaximumApplications) return Ok(new FailureResponseModel { Message = "Can't accept more applications" });

            var currentCustomerId = int.Parse(GetEndUserId());

            var alreadySubmitted = _unitOfWork.CustomersJobTitles.Get(cjt => cjt.JobTitleId == id && cjt.CustomerId == currentCustomerId && !cjt.IsDeleted).Any();
            if (alreadySubmitted) return Ok(new FailureResponseModel { Message = "Already submitted" });

            _unitOfWork.CustomersJobTitles.Add(new CustomerJobTitle { JobTitleId = id, CustomerId = currentCustomerId });
            _unitOfWork.Commit();

            return Ok(new SuccessResponseModel());
        }
    }
}