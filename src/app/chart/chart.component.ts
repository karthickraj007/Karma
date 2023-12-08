import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Inject,
  Input,
  Renderer2,
  HostListener,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { LoginService } from '../services/login/login.service';
import moment from 'moment';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent {
  public output = [
    {
      _id: '65700859f9d46873de8d0b12',
      userName: 'Juni Setiawan',
      userID: 'KA1-Nav_Juni',
      password: 'Zuqo@!23',
      email: 'juni.setiawan@karmagroup.com',
      user_type: 'agent',
      skils: ['Concierge'],
      AHT: '00',
      TotalHandlingChat: 0,
      TotalChatCount: 0,
      campaignID: null,
      doj: '2023-05-24T00:00:00.000Z',
      department: [],
      jwtToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjQ2ZGQ2M2I3MjMzYjQ1NmNjMzk2YmY0IiwiaWF0IjoxNzAxODQwOTg1LCJleHAiOjE3MDE4Njk3ODV9.rifT60mWou2yu5VLVODLjEysyd8DNfiq2rWD7EYSh_g',
      permission: [],
      superior: 'KA1-Jessica_W',
      isOnCall: false,
      islogin: true,
      roomID: '',
      videoIP: '',
      startDate: '2023-05-23T19:00:01.658Z',
      groupID: 'karmaIndonesia',
      lat: '',
      long: '',
      address: [],
      team: 'Concierge',
      internalChatStatus: false,
      currentCustomerID: '',
      previousCustomerID: '',
      priority: 0,
      status: true,
      today: '2023126',
      totalchatcount: 0,
      totalVideocount: 0,
      loginCount: 1,
      currentStatus: 'Not Ready',
      codeStatus: '#notready',
      isFaceLogin: false,
      profile_pic: null,
      isFaceIdSet: false,
      profile_name: null,
      userWorkType: 'NRML',
      loginTime: '2023-12-06T05:36:25.804Z',
      loginlogouts: [
        {
          status: 'login',
          time: '2023-12-06T05:36:25.804Z',
        },
      ],
      sidebarPrivilages: [
        {
          name: 'Home',
          url: '/home',
          icon: 'assets/icons/home.svg',
        },
        {
          name: 'Interaction Center',
          url: '/chats',
          icon: 'assets/icons/Voicechatsocial.svg',
        },
        {
          name: 'Callbacks',
          url: '/callbacks',
          icon: 'assets/icons/callback2.svg',
        },
      ],
      prilage: 'privilage9(Home,IQ,CB) ',
      DeviceId: null,
      loginType: 'W',
      __v: 0,
      voices: [],
    },
  ];

  abandonedData: any;
  constructor(public loginService: LoginService) {}

  agentDetails: any;
  seMTime: any = 6000;
  intervalId: any;
  ready: any = 0;
  inCall: any = 0;
  pause: any = 0;
  dispo: any = 0;
  outbound: any = 0;
  currentStatusInfo: any = {};
  ngOnInit() {
    // if (this.intervalId) {
    //   clearInterval(this.intervalId);
    // }
    // this.intervalId = setInterval(() => {
    // this.getAgentDetails();
    // }, this.seMTime);
  }

  ngOnDestroy(): void {
    // console.log("destroy",this.interval)
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getAgentDetails() {
    this.loginService
      .getTeamActivityDetails({ _id: 'Concierge' })
      .subscribe((data: any) => {
        this.agentDetails = data?.output;

        this.agentDetails.map(async (result: any) => {
          console.log('KOlamakakka', result);
          // if(this.currentStatusInfo[result?._id] != result?.currentStatus){
          this.currentStatusInfo[result?._id] = result?.currentStatus;
          if (result?.codeStatus == '#ready') {
            this.ready += 1;
          } else if (result?.codeStatus == '#oncall') {
            this.inCall += 1;
          } else if (
            result?.codeStatus == '#notready' ||
            result?.codeStatus == '#team_break' ||
            result?.codeStatus == '#training' ||
            result?.codeStatus == '#feedback' ||
            result?.codeStatus == '#lunchbreak' ||
            result?.codeStatus == '#leisure'
          ) {
            this.pause += 1;
          } else if (result?.codeStatus == '#acw') {
            this.dispo += 1;
          } else if (result?.codeStatus == '#outbound') {
            this.outbound += 1;
          }
          const time = moment().startOf('day').add(result?.AHT, 'seconds');
          result['AHT2'] = time.format('HH:mm:ss');
          // setInterval(() => {
          //   const statusTime = moment(result?.currentStatusDT);
          //   const currentTime = moment();
          //   console.log('KSKSKSKSKSKS', currentTime, statusTime);
          //   const difference = moment.duration(currentTime.diff(statusTime));
          //   result['currentTImeInt'] = moment
          //     .utc(difference.asMilliseconds())
          //     .format('HH:mm:ss');
          //   //result["currentTImeInt"] = this.setInformationData(result)
          // }, 1000);
          // setInterval(() => {
          //   this.getAgentDetails();
          // }, 7000);
          // }
        });
        console.log('KOSLSLSLLSS', this.agentDetails);
        // this.loginService.setliveDashData(this.overallData)
      });
  }
}
