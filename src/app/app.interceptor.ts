import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { LoginService } from './services/login/login.service';
import * as CryptoJS from 'crypto-js'; 
import { environment } from './../environments/environment';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private LoginService: LoginService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
    return next.handle(this.addAuthToken(request)).pipe(
      tap(
        (event: any) => {
          if (event['status'] == 200) {
             let findSignin = event['url'].split('/');
            //  console.log(findSignin,"event['url']",findSignin[2],findSignin[2] == "sip.waterlabsai.app")

            if(findSignin[findSignin.length -1] == 'login' || findSignin[findSignin.length -1] == 'loginFaceVerifivation'){

              let data = JSON.parse(CryptoJS.AES.decrypt(event['body']['output'], environment.encryption_key).toString(CryptoJS.enc.Utf8))
              // console.log(data,"asdasdasdasd",data?.jwtToken)
              event['body']['output'] = JSON.parse(CryptoJS.AES.decrypt(event['body']['output'], environment.encryption_key).toString(CryptoJS.enc.Utf8))
              sessionStorage.setItem("token",(findSignin[findSignin.length -1] == 'login')?data?.data?.jwtToken:data?.jwtToken)
            }else if(findSignin[findSignin.length -1] != "upload" && findSignin[2] != environment.interceptor){
              // console.log(event,"asdasdasdasd",event['body'],Object.keys(event))
              event['body']['output'] = JSON.parse(CryptoJS.AES.decrypt(event['body']['output'], environment.encryption_key).toString(CryptoJS.enc.Utf8))

            }else if(findSignin[2] == environment.interceptor || findSignin[2] == "shorturl.zuqodemo.world"){
              return event
            }
          } else if (event['status'] == 403) {
            // this.toaster.error("Token expired")
            // this.LoginService.logout().subscribe(data => {
            //   sessionStorage.clear()
            //   setTimeout(() => {
            //     window.location.reload();
            //   }, 500);
            // });
          }else if (event['status'] == 422 || event['status'] == 500){
            
            // this.toaster.error("Invalid Response,Please check your input")
          }
          // else{
          //   this.toaster.error("Invalid Response,Please check your input")
          // }
        },
        error => {
          //logging the http response to browser's console in case of a failuer
          // if (event instanceof HttpErrorResponse) {
          //   console.log("api call error :", event);
          // }
        }
      )
    );
  }

  addAuthToken(request: HttpRequest<any>) {
    let findSignin = request?.url.split('/');
    // console.log("KKSSKSKS", request?.url)
    const token = (findSignin[findSignin.length - 1] == 'login') ? "iquwdbiqbibibqibqiwdqiw23ei21iueb23iubi2ub3" : "iquwdbiqbibibqibqiwdqiw23ei21iueb23iubi2ub3"
    if (!token) {
      return request;
    }

    return request.clone({
      setHeaders: {
        Authorization: `Axi12#$ ${token}`,
        'Cache-Control': `no-store`,
      },
    });
  }
}
