import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobTitleDeleteComponent } from './components/job-title-delete/job-title-delete.component';
import { JobTitleDetailsComponent } from './components/job-title-details/job-title-details.component';
import { JobTitlesListComponent } from './components/job-titles-list/job-titles-list.component';

const routes: Routes = [
  {
    path: '',
    component: JobTitlesListComponent,
    data: {
      title: 'Job Titles',
    },
  },
  {
    path: 'details/:id',
    component: JobTitleDetailsComponent,
    data: {
      title: 'Job Title Details',
    },
  },
  {
    path: 'delete-item/:id',
    component: JobTitleDeleteComponent,
    data: {
      title: 'Delete Job Title',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobTitleRoutingModule {}
