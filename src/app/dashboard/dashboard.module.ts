import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { StatsComponent } from './stats/stats.component';
import { OverviewComponent } from './overview/overview.component';
import { DashboardRouteModule } from './dashboard.route.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    DashboardComponent,
    CreateTaskComponent,
    TaskDetailsComponent,
    StatsComponent,
    OverviewComponent,
  ],
  exports: [
    // DashboardComponent,
    // CreateTaskComponent,
    // TaskDetailsComponent,
    // we dont need to export it cz its in the route dashboard module 
    SharedModule,
    DashboardRouteModule
  ],
  imports: [CommonModule, SharedModule,RouterModule],
})
export class DashboardModule {}
