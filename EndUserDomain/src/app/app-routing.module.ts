import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateAccountComponent } from './modules/authentication/create-account/create-account.component';
import { SigninComponent } from './modules/authentication/signin/signin.component';
import { StartComponent } from './modules/authentication/start/start.component';
import { JobTitlesComponent } from './modules/job-title/components/job-titles/job-titles.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: StartComponent },
  { path: 'sign-in', component: SigninComponent },
  { path: 'register', component: CreateAccountComponent },
  { path: 'job-titles', component: JobTitlesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
