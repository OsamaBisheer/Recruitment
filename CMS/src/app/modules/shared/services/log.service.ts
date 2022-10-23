/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from "@angular/core";
import { ToasterService, ToasterConfig } from "angular2-toaster/angular2-toaster";
import { LogLevel } from "../models/enums";

@Injectable({
  providedIn: "root",
})
export class LogService {
  toasterconfig: ToasterConfig = new ToasterConfig({
    tapToDismiss: true,
    timeout: 5000,
  });

  constructor(private toaster: ToasterService) {}

  pop(level: LogLevel, body: string) {
    switch (level) {
      case LogLevel.Info:
        this.toaster.popAsync(level, "Info !!!", body);
        break;

      case LogLevel.Error:
        this.toaster.popAsync(level, "Error !!!", body);
        break;

      case LogLevel.Warning:
        this.toaster.popAsync(level, "Alert !!!", body);
        break;

      case LogLevel.Success:
        this.toaster.popAsync(level, "Success !!!", body);
        break;

      case LogLevel.Primary:
        this.toaster.popAsync(level, "Primary !!!", body);
        break;
    }
  }

  info = (body: string) => this.pop(LogLevel.Info, body);
  error = (body: string) => this.pop(LogLevel.Error, body);
  warning = (body: string) => this.pop(LogLevel.Warning, body);
  success = (body: string) => this.pop(LogLevel.Success, body);
  primary = (body: string) => this.pop(LogLevel.Primary, body);
}
