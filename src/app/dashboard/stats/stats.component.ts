import { Component, inject } from '@angular/core';
import { TaskService } from '../../Services/task.service';
import { Task } from '../../Models/Task';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent {
  inprogress: number = 0;
  open: number = 0;
  started: number = 0;
  closed: number = 0;
  total: number = 0;
  tasks: Task[] = [];

  taskService: TaskService = inject(TaskService);

  ngOnInit() {
    this.taskService.GetAllTasks().subscribe((taskList: Task[]) => {
      this.tasks = taskList;
      this.total = taskList.length;
      this.open = taskList.filter((x) => x.status === 'open').length;
      this.started = taskList.filter((x) => x.status === 'started').length;
      this.inprogress = taskList.filter(
        (x) => x.status === 'in-progress'
      ).length;
      this.closed = taskList.filter((x) => x.status === 'closed').length;
    });
  }
}
