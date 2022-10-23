/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export enum LogLevel {
  Info = 1,
  Error = 2,
  Warning = 3,
  Success = 4,
}

@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor(private toaster: ToastrService) {}

  pop(level: LogLevel, body: string) {
    switch (level) {
      case LogLevel.Info:
        this.toaster.info(body);
        break;

      case LogLevel.Error:
        this.toaster.error(body),
          {
            positionClass: 'toast-top-full-width',
          };
        break;

      case LogLevel.Warning:
        this.toaster.warning(body),
          {
            positionClass: 'toast-top-full-width',
          };
        break;

      case LogLevel.Success:
        this.toaster.success(body, '', {
          positionClass: 'toast-top-full-width',
        });
        break;

      default:
        this.toaster.info(body, '', { positionClass: 'toast-top-full-width' });
        break;
    }
  }

  error = (body: string) => this.pop(LogLevel.Error, body);
  info = (body: string) => this.pop(LogLevel.Info, body);
  success = (body: string) => this.pop(LogLevel.Success, body);
  warning = (body: string) => this.pop(LogLevel.Warning, body);
}
