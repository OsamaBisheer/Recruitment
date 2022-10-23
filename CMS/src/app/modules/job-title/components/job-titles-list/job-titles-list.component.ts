import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';

import { HttpService } from 'src/app/modules/shared/services/http.service';
import { LogService } from 'src/app/modules/shared/services/log.service';
import { DataTable } from 'src/app/modules/shared/models/dataTable';
import { IResponseModel } from 'src/app/modules/shared/models/response-model';
import { dealingWithIResponseModel } from 'src/app/modules/shared/utilities/methods';
import { JobTitle } from '../../models/job-title';
import { Enum, JobCategory } from 'src/app/modules/shared/models/enums';

@Component({
  selector: 'app-job-titles-list',
  templateUrl: './job-titles-list.component.html',
  styleUrls: ['./job-titles-list.component.scss'],
})
export class JobTitlesListComponent implements OnInit {
  list: JobTitle[] = [];
  totalRecords: number = 0;
  dataTable = new DataTable();
  first = 0;
  search = '';

  constructor(
    private httpService: HttpService,
    private router: Router,
    private logService: LogService
  ) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    const params = this.dataTable.getHttpParams();

    const onSuccess = (response: IResponseModel) => {
      this.list = response.result.data;
      this.totalRecords = response.result.totalRecords;
    };
    const onError = (response: IResponseModel) => {
      this.logService.error(`${response.message}`);
    };
    this.httpService
      .getRequestWithParameters('job-titles', params)
      .subscribe((response: IResponseModel) => {
        dealingWithIResponseModel(response, onSuccess, onError);
      });
  }

  nextPage(event: LazyLoadEvent) {
    this.dataTable.nextPage(event);
    this.reloadData();
  }

  searchAction() {
    this.dataTable.searchAction(this.search);
    this.first = 0;

    return this.reloadData();
  }

  addJobTitle() {
    this.router.navigate(['/job-titles/details/', 0]);
  }

  onEdit(id: number) {
    this.router.navigate(['/job-titles/details/', id]);
  }

  onDelete(id: number) {
    this.router.navigate(['/job-titles/delete-item/', id]);
  }

  getJobCategory = (jobCategory: number): string =>
    Enum.getOptionByValue(jobCategory, Enum.getOptionsFromEnum(JobCategory))
      .label;
}
