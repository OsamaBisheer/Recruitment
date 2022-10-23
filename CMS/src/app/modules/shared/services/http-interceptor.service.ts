/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private httpService: HttpService) {}

  currentRequestCounter: number = 0;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.httpService.startReq();

    this.currentRequestCounter++;

    return next.handle(req).pipe(
      finalize(() => {
        this.currentRequestCounter--;
        if (this.currentRequestCounter === 0) this.httpService.endFinalReq();
      })
    );
  }
}
