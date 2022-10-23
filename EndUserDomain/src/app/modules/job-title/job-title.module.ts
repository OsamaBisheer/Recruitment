import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../shared/shared.module';
import { JobTitlesComponent } from './components/job-titles/job-titles.component';
import { JobTitleItemComponent } from './components/job-title-item/job-title-item.component';

@NgModule({
  declarations: [JobTitlesComponent, JobTitleItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
  ],
})
export class JobTitleModule {}
