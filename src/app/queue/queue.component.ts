import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject,Input, Renderer2, HostListener, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrl: './queue.component.css',
})
export class QueueComponent {

  abandonedData: any
  constructor(
    public loginService: LoginService
  ){}
 
  @Input() overallData: any;

}
