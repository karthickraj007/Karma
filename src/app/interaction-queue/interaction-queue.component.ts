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
  public value: string[] = [
    'Avaliable',
    'Meeting',
    'Training',
    'Lunch',
    'Web_Chat',
    'External_Call',
    'Manual_call',
    'Walk_in_Member',
    'Admin-Reporting',
  ];

  public chartData = {
    Avaliable: 20,
    Meeting: 80,
    Training: 40,
    Lunch: 50,
    Web_Chat: 60,
    External_Call: 70,
    Manual_call: 40,
    Admin_Reporting: 50,
    Walk_in_Member: 60,
  };
  public chartColors = {
    Avaliable: '#79D2C2',
    Meeting: '#FFB63F',
    Training: '#EBB93F',
    Lunch: '#3FA2F0',
    Web_Chat: '#FEAC5E',
    External_Call: '#4CD964',
    Manual_call: '#9DD3BE',
    Admin_Reporting: '#FF5A5E',
    Walk_in_Member: '#FFC0CB',
  };
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

  getBackgroundColor(k: any): string {
    switch (k) {
      case 'Avaliable':
        return 'red';
      case 'Meeting':
        return 'pink';
      case 'Training':
        return 'green';
      case 'Lunch':
        return 'yellow';
      case 'Web_Chat':
        return 'orange';
      case 'External_Call':
        return 'purple';
      case 'Manual_call':
        return 'black';
      case 'Admin-Reporting':
        return 'blue';
      case 'Walk_in_Member':
        return 'brown';
      default:
        return 'blue';
    }
  }

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
  public dummy = [
    {
      available: '0',
      ...Chart.defaults.animation,
    },
    {
      itm: '3eq',
      ua: [{}],
      meeting: '80',
    },
  ];
  ngOnInit(): void {
    this.getAgentDetails();
    //this.createChart();
  }

  getAgentDetails() {
    console.log('start');

    this.loginService
      .getTeamActivityDetails({ _id: 'Concierge' })
      .subscribe((data: any) => {
        this.agentDetails = data?.output;
        // this.agentDetails = this.output;
        this.inCall = 10;
        this.ready = 20;
        this.pause = 40;
        this.dispo = 33;
        this.outbound = 66;
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
            result?.codeStatus == '#leisure' ||
            result?.codeStatus == '#campaign'
          ) {
            this.pause += 1;
          } else if (result?.codeStatus == '#acw') {
            this.dispo += 1;
          } else if (result?.codeStatus == '#outbound') {
            this.outbound += 1;
          }
          const time = moment().startOf('day').add(result?.AHT, 'seconds');
          result['AHT2'] = time.format('HH:mm:ss');
          setInterval(() => {
            const statusTime = moment(result?.currentStatusDT);
            const currentTime = moment();
            console.log('KSKSKSKSKSKS', currentTime, statusTime);
            const difference = moment.duration(currentTime.diff(statusTime));
            result['currentTImeInt'] = moment
              .utc(difference.asMilliseconds())
              .format('HH:mm:ss');
            // result["currentTImeInt"] = this.setInformationData(result)
          }, 1000);
          setInterval(() => {
            this.getAgentDetails();
          }, 7000);
          this.createChart();
          this.chart.data.datasets[0].data = data;
          this.chart.update();
          this.chart.data.dataSets[0].data = [
            this.ready,
            this.inCall,
            this.pause,
            this.dispo,
            this.outbound,
          ];
        });
      });
    console.log('KOSLSLSLLSS', this.agentDetails);
    // this.loginService.setliveDashData(this.overallData)
    //});
  }

  createChart() {
    console.log('oeolldodlslsls', this.pause);
    this.chart = new Chart('MyChart', {
      type: 'doughnut', //this denotes tha type of chart

      data: {
        //values on X-Axis
        // labels: [
        //   'Avaliable',
        //   'Meeting',
        //   'Training',
        //   'Lunch',
        //   'Admin-Reporting',
        //   'Walk in Member',
        //   'Web Chat',
        //   'External Call',
        //   'Manual call',
        // ],
        labels: Object.keys(this.chartData),
        datasets: [
          {
            // label: ['Ready', 'On Call', 'Pause', 'Disposition', 'Outbound'],
            // label: this.datas.keys(),
            data: Object.values(this.chartData),
            // data: this.datas.values(),
            backgroundColor: [
              'red',
              'pink',
              'green',
              'yellow',
              'orange',
              'purple',
              'black',
              'blue',
              'brown',
            ],
            hoverOffset: 2,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          legend: {
            position: 'center',
          },
        },
      },
    });
  }
}
