import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { HttpService } from 'src/app/modules/shared/services/http.service';
import { LogService } from 'src/app/modules/shared/services/log.service';
import { IResponseModel } from 'src/app/modules/shared/models/response-model';
import { dealingWithIResponseModel } from 'src/app/modules/shared/utilities/methods';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public userForm: FormGroup;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private logService: LogService
  ) {
    const token = localStorage.getItem('token');
    if (token != null) {
      this.router.navigate(['/job-titles']);
    }
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  };

  public hasErrors = (controlName: string) => {
    return (
      this.userForm.controls[controlName].errors &&
      this.userForm.controls[controlName].touched
    );
  };

  onSubmit() {
    if (this.userForm.invalid) return this.logService.error('Invalid data');

    const model = {
      userName: (this.userForm.get('userName') as FormGroup).value as string,
      password: (this.userForm.get('password') as FormGroup).value as string,
    };

    const onSuccess = (response: IResponseModel) => {
      const token = (<any>response).result.token;
      localStorage.setItem('token', token);
      localStorage.setItem('username', (<any>response).result.username);
      this.logService.success('Welcome ' + (<any>response).result.username);

      this.router.navigate(['/job-titles']);
    };

    const onError = (response: IResponseModel) =>
      this.logService.error(`${response.message}`);

    this.httpService
      .postRequest('admin/users/login', model)
      .subscribe((response: IResponseModel) => {
        dealingWithIResponseModel(response, onSuccess, onError);
      });
  }
}
