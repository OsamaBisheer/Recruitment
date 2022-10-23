import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
})
export class PasswordInputComponent implements OnInit {
  @Input() control: FormControl;
  @Input() isSubmitted: boolean;
  @Input() type: string = 'password';
  @Input() placeHolder: string = 'passwordPlaceholder';

  showPassword: boolean = false;
  constructor() {}

  ngOnInit() {}
}
