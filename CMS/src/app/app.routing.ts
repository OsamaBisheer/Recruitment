import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './modules/core/components/layout/layout.component';

// Import Core Components
import { LoginComponent } from './modules/core/components/login/login.component';
import { LogoutComponent } from './modules/core/components/logout/logout.component';
import { NotFoundComponent } from './modules/core/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/job-titles', pathMatch: 'full' },
      {
        path: 'job-titles',
        loadChildren: () =>
          import('./modules/job-title/job-title.module').then(
            (m) => m.JobTitleModule
          ),
      },
      {
        path: '404',
        component: NotFoundComponent,
        data: {
          title: '404',
        },
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
