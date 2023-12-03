import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-maindash-board',
  templateUrl: './maindash-board.component.html',
  styleUrl: './maindash-board.component.css',
})
export class MaindashBoardComponent {
  public chart1: any;

  ngOnInit(): void {
    this.createChart();
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
              'blue',
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
