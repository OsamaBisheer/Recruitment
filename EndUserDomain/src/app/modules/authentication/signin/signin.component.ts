import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { HttpService } from 'src/app/modules/shared/services/http.service';
import { LogService } from 'src/app/modules/shared/services/log.service';
import { ResponseModel } from 'src/app/modules/shared/models/response-model';
import { RegularExpressions } from '../../shared/models/regular-expression';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signinForm: any = new FormGroup({
    email: new FormControl('', this.geEmailValidators()),
    password: new FormControl('', this.gePasswordValidators()),
  });

  isSubmitted: boolean = false;

  showPassword: boolean = false;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private logService: LogService
  ) {}

  ngOnInit() {}

  geEmailValidators(): ValidatorFn[] {
    return [Validators.required, Validators.pattern(RegularExpressions.email)];
  }

  gePasswordValidators(): ValidatorFn[] {
    return [
      Validators.required,
      Validators.pattern(RegularExpressions.password),
    ];
  }

  signIn() {
    for (const i in this.signinForm.controls) {
      this.signinForm.get(i).markAsDirty();
    }

    this.isSubmitted = true;

    if (!this.signinForm.valid) return;

    const model = {
      email: this.signinForm.value['email'] as string,
      password: this.signinForm.value['password'] as string,
    };

    this.httpService
      .postRequest('end-users/login', model)
      .subscribe((response: ResponseModel) => {
        if (response.isSuccess) {
          const token = response.result.token;
          localStorage.setItem('token', token);
          this.logService.success('Welcome' + ' ' + response.result.username);
          this.router.navigate(['job-titles']);
        } else if (!response.isSuccess) {
          this.logService.error(response.message);
        }
      });
  }
}
