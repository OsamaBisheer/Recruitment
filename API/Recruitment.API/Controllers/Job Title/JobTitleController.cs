using DelegateDecompiler;
using Microsoft.AspNetCore.Mvc;
using Recruitment.Domain.Entities;
using Recruitment.Domain.ViewModels;
using Recruitment.Repository.Common;

namespace Recruitment.API.Controllers
{
    [Route("api/job-titles")]
    public class JobTitleController : AdminControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public JobTitleController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public IActionResult GetJobTitles([FromQuery] DataTableRequest request)
        {
            var tableResult = _unitOfWork.JobTitles.GetJobTitles(request);
            ResponseModel responseModel = tableResult.TotalRecords == 0 ? new FailureResponseModel() { Message = "No Data" }
                                                                        : new SuccessResponseModel() { Result = tableResult };
            return Ok(responseModel);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var jobTitle = _unitOfWork.JobTitles.Get(jt => jt.Id == id && !jt.IsDeleted).Decompile().Select(jt => JobTitleModel.Create(jt)).FirstOrDefault();
            if (jobTitle == null) return Ok(new FailureResponseModel { Message = "Not found" });
            return Ok(new SuccessResponseModel { Result = jobTitle });
        }

        [HttpPost]
        public IActionResult Create(JobTitleModel jobTitleModel)
        {
            var error = jobTitleModel.Validate();
            if (!string.IsNullOrEmpty(error)) return Ok(new FailureResponseModel { Message = error });

            jobTitleModel.CreatedByUserName = GetAdminName();
            var jobTitle = JobTitle.Create(jobTitleModel);
            _unitOfWork.JobTitles.AddAndSave(jobTitle);

            return Ok(new SuccessResponseModel { Result = jobTitle });
        }

        [HttpPut]
        public IActionResult Update(JobTitleModel jobTitleModel)
        {
            var error = jobTitleModel.Validate();
            if (!string.IsNullOrEmpty(error)) return Ok(new FailureResponseModel { Message = error });

            var jobTitle = _unitOfWork.JobTitles.Get(jt => jt.Id == jobTitleModel.Id && !jt.IsDeleted).FirstOrDefault();
            if (jobTitle == null) return Ok(new FailureResponseModel { Message = "Not found" });

            jobTitleModel.CreatedByUserName = GetAdminName();
            jobTitle.Update(jobTitleModel);
            _unitOfWork.JobTitles.Commit();

            return Ok(new SuccessResponseModel { Result = jobTitle });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var jobTitle = _unitOfWork.JobTitles.Find(id);
            if (jobTitle == null) return Ok(new FailureResponseModel { Message = "Not found" });

            _unitOfWork.JobTitles.RemoveAndSave(jobTitle);

            return Ok(new SuccessResponseModel());
        }
    }
}