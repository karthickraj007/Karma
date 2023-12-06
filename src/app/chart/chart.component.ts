import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject,Input, Renderer2, HostListener, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import moment from 'moment';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent {
  abandonedData: any
  constructor(
    public loginService: LoginService
  ){}
 agentDetails:any;
  seMTime: any = 6000;
  intervalId: any;
  ready: any= 0
  inCall:any =0
  pause: any=0
  dispo: any =0
  outbound: any=0
  currentStatusInfo:any = {}
  ngOnInit(){
    // if (this.intervalId) {
    //   clearInterval(this.intervalId);
    // }
    // this.intervalId = setInterval(() => {
      this.getAgentDetails()
    // }, this.seMTime);
  }

  ngOnDestroy(): void {
    // console.log("destroy",this.interval)
    if (this.intervalId) {
      clearInterval(this.intervalId);

    }
  }

  getAgentDetails(){
    this.loginService.getTeamActivityDetails({_id: "Concierge"}).subscribe((data: any) => {
      this.agentDetails = data?.output

      this.agentDetails.map(async(result: any) => {
        console.log("KOlamakakka", result)
        // if(this.currentStatusInfo[result?._id] != result?.currentStatus){
          this.currentStatusInfo[result?._id] = result?.currentStatus
          if(result?.codeStatus=='#ready'){
            this.ready+=1
          }else if(result?.codeStatus=='#oncall'){
            this.inCall+=1
          }else if(result?.codeStatus=='#notready' || result?.codeStatus=='#team_break'  || result?.codeStatus=='#training' 
          ||  result?.codeStatus=='#feedback'  ||  result?.codeStatus=='#lunchbreak' || result?.codeStatus=='#leisure'){
            this.pause+=1
          }else if(result?.codeStatus=='#acw'){
            this.dispo+=1
          }else if(result?.codeStatus == '#outbound'){
            this.outbound+=1
          }
          const time = moment().startOf('day').add(result?.AHT, 'seconds');
          result['AHT2'] = time.format('HH:mm:ss');
          setInterval(() => {
            const statusTime = moment(result?.currentStatusDT);
            const currentTime = moment();
            console.log("KSKSKSKSKSKS", currentTime, statusTime)
            const difference = moment.duration(currentTime.diff(statusTime));
            result["currentTImeInt"] =  moment.utc(difference.asMilliseconds()).format("HH:mm:ss");
            // result["currentTImeInt"] = this.setInformationData(result)
          }, 1000);
          setInterval(() => {
            this.getAgentDetails()
          },7000)
        // }
      });
      console.log("KOSLSLSLLSS",this.agentDetails)
      // this.loginService.setliveDashData(this.overallData)
    });
  }
}
