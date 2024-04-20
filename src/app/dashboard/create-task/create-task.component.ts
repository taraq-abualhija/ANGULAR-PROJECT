import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Task } from '../../Models/Task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css',
})
export class CreateTaskComponent {
  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  formToDashboard:EventEmitter<Task>=new EventEmitter();

  @Input()
  isEditMode:boolean=false

  @Input()
  selectedTask?:Task

  @ViewChild('form')
  formTask:NgForm

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.formTask.form.patchValue(this.selectedTask)
    }, 0);
  }

  OnCloseForm() {
    this.CloseForm.emit(false);
  }

  onFormSubmitted(form: NgForm) {
    this.formToDashboard.emit(form.value)
    this.CloseForm.emit(false);
  }
}
