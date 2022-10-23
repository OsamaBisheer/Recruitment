import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { HttpService } from 'src/app/modules/shared/services/http.service';
import { LogService } from 'src/app/modules/shared/services/log.service';
import { ResponseModel } from 'src/app/modules/shared/models/response-model';
import { RegularExpressions } from '../../shared/models/regular-expression';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  signupForm: any = new FormGroup({
    name: new FormControl('', [Validators.required]),
    mobile: new FormControl('', this.geMobileValidators()),
    email: new FormControl('', this.geEmailValidators()),
    password: new FormControl('', this.gePasswordValidators()),
    confirmPassword: new FormControl(''),
  });

  isSubmitted: boolean = false;

  showPassword: boolean = false;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private logService: LogService
  ) {}

  ngOnInit() {}

  geMobileValidators(): ValidatorFn[] {
    return [
      Validators.required,
      Validators.maxLength(11),
      Validators.pattern(RegularExpressions.egyptionPhoneNumber),
    ];
  }

  geEmailValidators(): ValidatorFn[] {
    return [Validators.required, Validators.pattern(RegularExpressions.email)];
  }

  gePasswordValidators(): ValidatorFn[] {
    return [
      Validators.required,
      Validators.pattern(RegularExpressions.password),
    ];
  }

  signUp() {
    for (const i in this.signupForm.controls) {
      this.signupForm.get(i).markAsDirty();
    }

    this.isSubmitted = true;

    if (!this.signupForm.valid) return;

    if (
      this.signupForm.value['password'] !==
      this.signupForm.value['confirmPassword']
    ) {
      return this.logService.error('Password and confirm password not matched');
    }

    const mobile: string =
      (this.signupForm.value['mobile'] as string).charAt(0) === '0'
        ? this.signupForm.value['mobile'].substring(1)
        : this.signupForm.value['mobile'];

    const model = {
      name: this.signupForm.value['name'],
      mobile: '+20' + mobile,
      email: this.signupForm.value['email'],
      password: this.signupForm.value['password'],
      confirmPassword: this.signupForm.value['confirmPassword'],
    };
    this.httpService
      .postRequest('end-users/register', model)
      .subscribe((response: ResponseModel) => {
        if (response.isSuccess) {
          this.logService.success('Register Successed');
          this.router.navigate(['sign-in']);
        } else {
          this.logService.error(response.message);
        }
      });
  }
}
