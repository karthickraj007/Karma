import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-maindash-board',
  templateUrl: './maindash-board.component.html',
  styleUrl: './maindash-board.component.css',
})
export class MaindashBoardComponent {
  public chart1: any;
  public values: string[] = [
    'Description',
    'Wrong_Number',
    'Training_Call',
    'Mc_Paid',
    'MC_Ongoing',
    'No_Response',
    'Booking_Ongoing',
    'Booking_Confirmed',
    'Complaint_Resolved',
    'Complaint_Escalated',
    'General Enq Complete',
    'General Enq Ongoing',
    'Disconnected Number',
    'Dialler Completed',
  ];

  ngOnInit(): void {
    this.createChart();
  }

  getBackgroundColor(k: any): string {
    switch (k) {
      case 'Description':
        return 'red';
      case 'Wrong_Number':
        return 'pink';
      case 'Training_Call':
        return 'green';
      case 'Mc_Paid':
        return 'yellow';
      case 'MC_Ongoing':
        return 'orange';
      case 'Booking_Ongoing':
        return 'purple';
      case 'Booking_Confirmed':
        return 'black';
      case 'Complaint_Resolved':
        return 'blue';
      case 'Complaint_Escalated':
        return 'brown';
      case 'No_Response':
        return 'orange';
      default:
        return 'blue';
    }
  }

  createChart() {
    this.chart1 = new Chart('MyChart1', {
      type: 'doughnut', //this denotes tha type of chart

      data: {
        // values on X-Axis
        // labels: ['Red', 'Pink', 'Green', 'Yellow', 'Orange', 'Blue'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [300, 240, 100, 432, 253, 34],
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
              'grey',
            ],
            hoverOffset: 4,
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
