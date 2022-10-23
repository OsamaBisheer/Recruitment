import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { HttpService } from 'src/app/modules/shared/services/http.service';
import { LogService } from 'src/app/modules/shared/services/log.service';
import { Enum, JobCategory } from 'src/app/modules/shared/models/enums';
import { JobTitle } from '../../models/job-title';
import { ResponseModel } from 'src/app/modules/shared/models/response-model';

@Component({
  selector: 'app-job-title-item',
  templateUrl: './job-title-item.component.html',
  styleUrls: ['./job-title-item.component.scss'],
})
export class JobTitleItemComponent implements OnInit {
  @Input() jobTitle: JobTitle = new JobTitle();

  @ViewChild('popup', { static: false }) popup!: ModalDirective;
  popupTitle!: string;
  popupBody!: string;

  constructor(
    private httpService: HttpService,
    private logService: LogService
  ) {}

  ngOnInit(): void {}

  getCategoryText(jobCategory: number): string {
    return Enum.getOptionByValue(
      jobCategory,
      Enum.getOptionsFromEnum(JobCategory)
    ).label;
  }

  showDescription() {
    this.popupTitle = 'Description';
    this.popupBody = this.jobTitle.description;

    this.showPopup();
  }

  showResponsibilities() {
    this.popupTitle = 'Responsibilities';
    this.popupBody = this.jobTitle.responsibilities;

    this.showPopup();
  }

  showSkills() {
    this.popupTitle = 'Skills';
    this.popupBody = this.jobTitle.skills;

    this.showPopup();
  }

  showPopup() {
    this.popup.show();
  }

  closePopup() {
    this.popup.hide();
  }

  submit() {
    this.closePopup();

    this.httpService
      .postRequest(`end-users-job-titles/${this.jobTitle.id}`, null)
      .subscribe((response: ResponseModel) => {
        if (response.isSuccess) {
          this.logService.success('Submit Successed');
        } else {
          this.logService.error(response.message);
        }
      });
  }
}
