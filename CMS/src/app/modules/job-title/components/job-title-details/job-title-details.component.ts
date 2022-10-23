import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpService } from 'src/app/modules/shared/services/http.service';
import { LogService } from 'src/app/modules/shared/services/log.service';
import {
  dealingWithIResponseModel,
  isInt,
} from 'src/app/modules/shared/utilities/methods';
import { IResponseModel } from 'src/app/modules/shared/models/response-model';
import { JobTitle } from '../../models/job-title';
import * as moment from 'moment';
import { IOption } from 'src/app/modules/shared/models/option';
import { Enum, JobCategory } from 'src/app/modules/shared/models/enums';

@Component({
  selector: 'app-job-title-details',
  templateUrl: './job-title-details.component.html',
  styleUrls: ['./job-title-details.component.scss'],
})
export class JobTitleDetailsComponent implements OnInit {
  jobTitle: JobTitle = new JobTitle();
  submitted: boolean = false;

  isInt: (value: any) => boolean;

  fromForDisplay: string;
  toForDisplay: string;

  jobCategories: IOption[] = [];

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private logService: LogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = parseInt(params['id']);
      if (id) {
        this.jobTitle.id = id;
        this.load();
      }
    });

    this.jobCategories = Enum.getOptionsFromEnum(JobCategory);
    if (!this.jobTitle.jobCategory) this.jobTitle.jobCategory = JobCategory.IT;

    this.isInt = isInt;
  }

  load() {
    const onSuccess = (response: IResponseModel) => {
      this.jobTitle = response.result as JobTitle;
      this.fromForDisplay = moment(this.jobTitle.from).format('YYYY-MM-DD');
      this.toForDisplay = moment(this.jobTitle.to).format('YYYY-MM-DD');
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

  save() {
    this.submitted = true;

    if (
      !this.jobTitle.name ||
      !this.jobTitle.description ||
      !this.jobTitle.responsibilities ||
      !this.jobTitle.skills ||
      !this.fromForDisplay ||
      !this.toForDisplay ||
      !this.jobTitle.maximumApplications ||
      !this.isInt(this.jobTitle.maximumApplications) ||
      this.jobTitle.maximumApplications < 0
    ) {
      return;
    }

    if (moment(this.toForDisplay).isBefore(moment(this.fromForDisplay))) {
      return this.logService.error('End date can not be lower than start date');
    }

    this.jobTitle.from = moment.utc(this.fromForDisplay, 'YYYY-MM-DD').toDate();
    this.jobTitle.to = moment.utc(this.toForDisplay, 'YYYY-MM-DD').toDate();

    if (!this.jobTitle.id) {
      this.add();
    } else {
      this.update();
    }
  }

  add() {
    const onSuccess = (response: IResponseModel) => {
      this.logService.success('Job title added successfully');
      this.back();
    };
    const onError = (response: IResponseModel) => {
      this.logService.error(response.message);
    };
    this.httpService
      .postRequest('job-titles', this.jobTitle)
      .subscribe((response: IResponseModel) => {
        dealingWithIResponseModel(response, onSuccess, onError);
      });
  }

  update() {
    const onSuccess = (response: IResponseModel) => {
      this.logService.success('Job title updated successfully');
      this.back();
    };
    const onError = (response: IResponseModel) => {
      this.logService.error(response.message);
    };
    this.httpService
      .putRequest('job-titles', this.jobTitle)
      .subscribe((response: IResponseModel) => {
        dealingWithIResponseModel(response, onSuccess, onError);
      });
  }

  back() {
    this.router.navigate(['/job-titles']);
  }
}
