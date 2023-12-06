import { Component } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import moment from 'moment';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-interaction-queue',
  templateUrl: './interaction-queue.component.html',
  styleUrl: './interaction-queue.component.css',
})
export class InteractionQueueComponent {
  public chart: any;
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
  ngOnInit(): void {
    
    this.getAgentDetails();
    // this.createChart()
  }



  getAgentDetails(){
    this.loginService.getTeamActivityDetails({_id: "Concierge"}).subscribe((data: any) => {
      this.agentDetails = data?.output
      this.inCall = 0;
      this.ready = 0;
      this.pause = 0;
      this.dispo = 0;
      this.outbound = 0;
      this.agentDetails.map(async(result: any) => {
        console.log("KOlamakakka", result)
        // if(this.currentStatusInfo[result?._id] != result?.currentStatus){
          this.currentStatusInfo[result?._id] = result?.currentStatus
          if(result?.codeStatus=='#ready'){
            this.ready+=1
          }else if(result?.codeStatus=='#oncall'){
            this.inCall+=1
          }else if(result?.codeStatus=='#notready' || result?.codeStatus=='#team_break'  || result?.codeStatus=='#training' 
          ||  result?.codeStatus=='#feedback'  ||  result?.codeStatus=='#lunchbreak' || result?.codeStatus=='#leisure'
          || result?.codeStatus=='#campaign'){
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
          this.createChart()
          // this.chart.data.datasets[0].data = data;
          // this.chart.update()
          // this.chart.data.dataSets[0].data  = [this.ready, this.inCall, 
          //   this.pause, this.dispo, this.outbound],
        // }
      });
      console.log("KOSLSLSLLSS",this.agentDetails)
      // this.loginService.setliveDashData(this.overallData)
    });
  }
  

  createChart() {
    console.log("oeolldodlslsls",this.pause)
    this.chart = new Chart('MyChart', {
      type: 'doughnut', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: ['Ready', 'On Call', 'Pause', 'Dispo', 'Outbound'],
        datasets: [
          {
            // label: ['Ready', 'On Call', 'Pause', 'Disposition', 'Outbound'],
             data: [this.ready, this.inCall, 
              this.pause, this.dispo, this.outbound],
            backgroundColor: [
              'red',
              'pink',
              'green',
              'yellow',
              'orange',
            ],
            hoverOffset: 2,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          legend: {
            position: 'right',
          },
        },
      },
    });
  }
}
