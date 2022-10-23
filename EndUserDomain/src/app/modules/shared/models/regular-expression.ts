export class RegularExpressions {
  static readonly email: RegExp =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  static readonly password: string = '(?=\\D*\\d)(?=.*[A-Za-z]).{6,50}';
  static readonly egyptionPhoneNumber: string = '(0|1)[0-9]*';
}
