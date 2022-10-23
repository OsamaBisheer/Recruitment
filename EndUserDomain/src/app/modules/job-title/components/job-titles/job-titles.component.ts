import { Component, OnInit } from '@angular/core';

import { HttpService } from 'src/app/modules/shared/services/http.service';
import { LogService } from 'src/app/modules/shared/services/log.service';
import { ResponseModel } from 'src/app/modules/shared/models/response-model';
import { JobTitle } from '../../models/job-title';

@Component({
  selector: 'app-job-titles',
  templateUrl: './job-titles.component.html',
  styleUrls: ['./job-titles.component.scss'],
})
export class JobTitlesComponent implements OnInit {
  jobTitles: JobTitle[] = [];

  constructor(
    private httpService: HttpService,
    private logService: LogService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.httpService
      .getRequest('end-users-job-titles')
      .subscribe((response: ResponseModel) => {
        if (response.isSuccess) {
          this.jobTitles = response.result as JobTitle[];
        } else if (!response.isSuccess) {
          this.logService.error(response.message);
        }
      });
  }
}
