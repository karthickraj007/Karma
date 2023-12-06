import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject,Input, Renderer2, HostListener, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent {

  abandonedData: any
  constructor(
    public loginService: LoginService
  ){}
 
  @Input() overallData: any;

}
