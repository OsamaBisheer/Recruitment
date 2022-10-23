import { NgModule } from '@angular/core';
import { UrlSerializer } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ModalModule } from 'ngx-bootstrap/modal';

import { LowerCaseUrlSerializer } from '../shared/lower-case-url-serializer';
import { SharedModule } from '../shared/shared.module';
import { JobTitleRoutingModule } from './job-title-routing.module';
import { JobTitlesListComponent } from './components/job-titles-list/job-titles-list.component';
import { JobTitleDetailsComponent } from './components/job-title-details/job-title-details.component';
import { JobTitleDeleteComponent } from './components/job-title-delete/job-title-delete.component';

@NgModule({
  declarations: [
    JobTitlesListComponent,
    JobTitleDetailsComponent,
    JobTitleDeleteComponent,
  ],
  imports: [
    SharedModule,
    JobTitleRoutingModule,
    TableModule,
    FormsModule,
    CommonModule,
    ModalModule.forRoot(),
  ],
  providers: [
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializer,
    },
  ],
})
export class JobTitleModule {}
