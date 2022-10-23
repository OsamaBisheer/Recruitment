import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

import { LogoBarComponent } from './components/logo-bar/logo-bar.component';
import { PageHeaderLightComponent } from './components/page-header-light/page-header-light.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    PageHeaderLightComponent,
    PasswordInputComponent,
    LogoBarComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    RouterModule,
  ],
  exports: [
    PageHeaderLightComponent,
    PasswordInputComponent,
    LogoBarComponent,
    SpinnerComponent,
  ],
  providers: [],
})
export class SharedModule {}
