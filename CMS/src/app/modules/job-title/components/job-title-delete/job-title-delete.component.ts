import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { HttpService } from 'src/app/modules/shared/services/http.service';
import { LogService } from 'src/app/modules/shared/services/log.service';
import { IResponseModel } from 'src/app/modules/shared/models/response-model';
import { dealingWithIResponseModel } from 'src/app/modules/shared/utilities/methods';
import { JobTitle } from '../../models/job-title';
import { Enum, JobCategory } from 'src/app/modules/shared/models/enums';

@Component({
  selector: 'app-job-title-delete',
  templateUrl: './job-title-delete.component.html',
  styleUrls: ['./job-title-delete.component.scss'],
})
export class JobTitleDeleteComponent implements OnInit {
  jobTitle: JobTitle = new JobTitle();

  @ViewChild('deletionPopup', { static: false }) deletionPopup: ModalDirective;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private logService: LogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = parseInt(params['id']);
      if (id) {
        this.jobTitle.id = id;
        this.load();
      } else {
        this.logService.error('You must select valid job title to delete ');
        this.back();
      }
    });
  }

  load() {
    const onSuccess = (response: IResponseModel) => {
      this.jobTitle = response.result as JobTitle;
    };
    const onError = (response: IResponseModel) => {
      this.logService.error(response.message);
      this.back();
    };
    this.httpService
      .getRequest(`job-titles/${this.jobTitle.id}`)
      .subscribe((response: IResponseModel) => {
        dealingWithIResponseModel(response, onSuccess, onError);
      });
  }

  showDeletionPopup() {
    this.deletionPopup.show();
  }

  cancel() {
    this.deletionPopup.hide();
  }

  delete() {
    if (this.jobTitle.id > 0) {
      const onSuccess = (response: IResponseModel) => {
        this.logService.success('Job title deleted successfully');
        this.back();
      };
      const onError = (response: IResponseModel) => {
        this.logService.error('Failed to delete job title');
        this.back();
      };
      this.httpService
        .deleteRequest(`job-titles/${this.jobTitle.id}`)
        .subscribe((response: IResponseModel) => {
          dealingWithIResponseModel(response, onSuccess, onError);
        });
    }
  }

  getJobCategory = (): string =>
    Enum.getOptionByValue(
      this.jobTitle.jobCategory,
      Enum.getOptionsFromEnum(JobCategory)
    ).label;

  back() {
    this.router.navigate(['/job-titles']);
  }
}
