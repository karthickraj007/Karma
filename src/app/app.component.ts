import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject, Renderer2, HostListener, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { LoginService } from './services/login/login.service';
import moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'karma1111';
  overallData: any;
  constructor(
    public loginService: LoginService
  ){}

  ngOnInit(){
    console.log("KSLLSLSLS")
    // setInterval(() => {
      this.getDashboard()
    // },5000)
  }

  getDashboard(){
    let date = moment().format("YYYY-MM-DD")
    this.loginService.getLiveDashboard({data:date}).subscribe((data: any) => {
      this.overallData = data?.output
      this.loginService.setliveDashData(this.overallData)
      setTimeout(() => {
        this.getDashboard()
      },7000)
    });
  }
}
