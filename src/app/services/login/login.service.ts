import { HostListener, Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  editUserData: any;
  constructor(public http: HttpClient, public router: Router) {}

  public resultData: any;
  public setReady = 0;
  public setincall = 0;
  public setpause = 0;
  public setacw = 0;
  public setoutbound = 0;

  // dummy login
  // login(item) {
  //   let url = `${environment.baseUrl}/api/user/login`;
  //   if(item.userName == 'k' && item.password == 'aa') {
  //     localStorage.setItem('userId', '23232');
  //     return {err_code: 1};
  //   } else {
  //     return {err_code: 0};
  //   }

  // }

  getLiveDashboard(data: any): Observable<any> {
    data['groupID'] = 'karmaIndonesia';
    data['startstamp'] = data?.date;
    let url = `${environment.baseUrl3}/admin/getLiveDashboard`;
    return this.http.post(url, data).pipe(
      map((data) => {
        console.log('Result Data1111', data);
        return data;
      })
    );
  }

  setliveDashData(type: any) {
    this.resultData = type;
  }

  getliveDashData() {
    return this.resultData;
  }

  getTeamActivityDetails(data: any) {
    let url = `${environment.baseUrl3}/admin/getTeamActivityDetails`;
    return this.http.post(url, data).pipe(
      map((data) => {
        console.log('Result Data1111', data);
        return data;
      })
    );
  }

  getreadystate() {
    return this.setReady;
  }

  getsetincall() {
    return this.setincall;
  }
  getpause() {
    return this.setpause;
  }
  getsetacw() {
    return this.setacw;
  }
  getoutbound() {
    return this.setoutbound;
  }
}
