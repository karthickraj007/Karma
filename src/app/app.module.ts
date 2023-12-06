import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { MaindashBoardComponent } from './maindash-board/maindash-board.component';
import { InteractionQueueComponent } from './interaction-queue/interaction-queue.component';
import { ChartComponent } from './chart/chart.component';
import { QueueComponent } from './queue/queue.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { AppInterceptor } from './app.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    MaindashBoardComponent,
    InteractionQueueComponent,
    ChartComponent,
    QueueComponent,
    DoughnutChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    }  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
