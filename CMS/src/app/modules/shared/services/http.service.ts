/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { LogService } from './log.service';
import * as FileSaver from 'file-saver';
import { Observable, Subject } from 'rxjs';
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
      this.toLogin();
    } else if (response?.error?.Message) {
      this.logService.error(response.error.Message);
    } else {
      this.logService.error('An error occurred');
    }
  }

  toLogin() {
    localStorage.clear();
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }

    this.router.navigate(['/login']);
  }

  setHeaders() {
    this.token = localStorage.getItem('token') as string;
    if (this.token)
      this.myHeader = new HttpHeaders().append(
        'Authorization',
        `Bearer ${this.token}`
      );
  }

  deepCopy(obj: any): any {
    let copy: any;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || 'object' != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.deepCopy(obj[i]);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (const attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          (copy as any)[attr] = this.deepCopy(obj[attr]);
        }
      }
      return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
  }

  getUsername(): string {
    return localStorage.getItem('username');
  }

  downloadFile(url: string, savedFileName: string) {
    FileSaver.saveAs(url, savedFileName);
  }
}
