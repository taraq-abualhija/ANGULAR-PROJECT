import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../Models/Task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css',
})
export class TaskDetailsComponent {
  @Output()
  closeDetailsPage: EventEmitter<boolean> = new EventEmitter();

  @Input()
  selectedTask?: Task


  onCloseDetailsPage() {
    this.closeDetailsPage.emit(false);
  }
}
