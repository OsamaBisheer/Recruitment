/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { LogService } from './log.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  hostUrl: string = environment.hostUrl;
  apiBaseUrl: string = this.hostUrl + 'api/';
  apiBaseUrlNormal: string = this.hostUrl + 'api/';

  private token: string;
  myHeader: HttpHeaders = new HttpHeaders();

  private startReqSubject: Subject<void> = new Subject();
  private endFinalReqSubject: Subject<void> = new Subject();

  startReq() {
    this.startReqSubject.next();
  }

  get startReqAsObservable() {
    return this.startReqSubject.asObservable();
  }

  endFinalReq() {
    this.endFinalReqSubject.next();
  }

  get endFinalReqAsObservable() {
    return this.endFinalReqSubject.asObservable();
  }

  constructor(
    private http: HttpClient,
    public router: Router,
    private logService: LogService
  ) {
    this.token = localStorage.getItem('token') as string;
  }

  getRequest(endPoint: string): Observable<any> {
    this.token = localStorage.getItem('token') as string;

    if (this.token)
      this.myHeader = new HttpHeaders().append(
        'Authorization',
        `Bearer ${this.token}`
      );

    return this.http
      .get(this.apiBaseUrl + endPoint, { headers: this.myHeader })
      .pipe(catchError((err) => this.handleError(err)));
  }

  getNormalRequest(endPoint: string): Observable<any> {
    this.token = localStorage.getItem('token') as string;

    if (this.token)
      this.myHeader = new HttpHeaders().append(
        'Authorization',
        `Bearer ${this.token}`
      );

    return this.http
      .get(this.apiBaseUrlNormal + endPoint, { headers: this.myHeader })
      .pipe(catchError((err) => this.handleError(err)));
  }

  getRequestWithParameters(
    endPoint: string,
    params: HttpParams
  ): Observable<any> {
    this.token = localStorage.getItem('token') as string;

    if (this.token) {
      this.myHeader = new HttpHeaders().append(
        'Authorization',
        `Bearer ${this.token}`
      );
    }

    return this.http
      .get(this.apiBaseUrl + endPoint, { params, headers: this.myHeader })
      .pipe(catchError((err) => this.handleError(err)));
  }

  postRequest(endPoint: string, data: any): Observable<any> {
    this.token = localStorage.getItem('token') as string;
    //  data.createdByUserName = localStorage.getItem("username") as string;

    if (this.token)
      this.myHeader = new HttpHeaders().append(
        'Authorization',
        `Bearer ${this.token}`
      );

    return this.http
      .post(this.apiBaseUrl + endPoint, data, { headers: this.myHeader })
      .pipe(catchError((err) => this.handleError(err)));
  }

  putRequest(endPoint: string, data: any): Observable<any> {
    this.token = localStorage.getItem('token') as string;
    //   data.createdByUserName = localStorage.getItem("username") as string;

    if (this.token)
      this.myHeader = new HttpHeaders().append(
        'Authorization',
        `Bearer ${this.token}`
      );

    return this.http
      .put(this.apiBaseUrl + endPoint, data, { headers: this.myHeader })
      .pipe(catchError((err) => this.handleError(err)));
  }

  patchRequest(endPoint: string, data: any): Observable<any> {
    this.token = localStorage.getItem('token') as string;
    //   data.createdByUserName = localStorage.getItem("username") as string;

    if (this.token)
      this.myHeader = new HttpHeaders().append(
        'Authorization',
        `Bearer ${this.token}`
      );

    return this.http
      .patch(this.apiBaseUrl + endPoint, data, { headers: this.myHeader })
      .pipe(catchError((err) => this.handleError(err)));
  }

  deleteRequest(endPoint: string): Observable<any> {
    this.token = localStorage.getItem('token') as string;
    if (this.token)
      this.myHeader = new HttpHeaders().append(
        'Authorization',
        `Bearer ${this.token}`
      );

    return this.http
      .delete(this.apiBaseUrl + endPoint, { headers: this.myHeader })
      .pipe(catchError((err) => this.handleError(err)));
  }

  delete(endPoint: string, data: any): Observable<any> {
    this.token = localStorage.getItem('token') as string;
    //   data.userName = localStorage.getItem("username") as string;

    if (this.token)
      this.myHeader = new HttpHeaders().append(
        'Authorization',
        `Bearer ${this.token}`
      );

    return this.http
      .post(this.apiBaseUrl + endPoint, data, { headers: this.myHeader })
      .pipe(catchError((err) => this.handleError(err)));
  }

  handleError(response: any): any {
    if (response?.status == 404) {
      return this.router.navigate(['/404']);
    } else if (response?.status == 401 || response?.status == 403) {
      this.logService.error('Login first');
      this.logout();
    } else if (response?.error?.Message) {
      this.logService.error(response.error.Message);
    } else {
      this.logService.error('An error occurred');
    }
  }

  logout() {
    localStorage.clear();
    return this.router.navigate(['/start']);
  }

  setHeaders() {
    this.token = localStorage.getItem('token') as string;
    if (this.token)
      this.myHeader = new HttpHeaders().append(
        'Authorization',
        `Bearer ${this.token}`
      );
  }
}
