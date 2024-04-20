import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { TaskService } from '../../Services/task.service';
import { Task } from '../../Models/Task';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {
  editMode: boolean = false;
  showCreateTaskForm: boolean = false;
  http: HttpClient = inject(HttpClient);
  taskService: TaskService = inject(TaskService);
  selectTask: Task;
  idTaskUpdate: string;
  isLoading: boolean = false;
  isError: boolean = false;
  errorMessage: string | null = null;
  listsToShow: Task[];
  showDetailsPage: boolean = false;
  selectTaskToDetailsPage: Task;

  ngOnInit(): void {
    this.fetchAllTasks();

    this.taskService.errorSubject.subscribe({
      next: (httpError) => {
        this.setErrorMessage(httpError);
      },
    });
  }

  closeShowDetailPage(event: boolean) {
    this.showDetailsPage = event;
  }

  ShowDetailsPageById(id: string) {
    this.showDetailsPage = true;
    this.taskService.getTaskById(id).subscribe({
      next: (data: Task) => {
        this.selectTaskToDetailsPage = data;
        console.log(data);
      },
    });
  }

  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;
    this.editMode = false;
    this.selectTask = {
      title: '',
      description: '',
      assignedTo: '',
      date: '',
      priority: '',
      status: '',
    };
  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
  }

  private setErrorMessage(err: HttpErrorResponse) {
    if (err.error.error === 'Permission denied') {
      this.errorMessage = 'You do not have permisssion to perform this action';
    } else {
      // this.errorMessage = err.message;
      this.errorMessage = 'Error please try again';
    }

    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }

  // POST CREATE NEW TASK
  UpsertTask(data: Task) {
    if (!this.editMode) {
      this.taskService.createTask(data);
    } else {
      this.taskService.updateTask(this.idTaskUpdate, data);
    }
  }

  // CALL GET ALL TASKS
  onFetchAllTask() {
    this.fetchAllTasks();
  }

  // GET ALL TASKS
  private fetchAllTasks() {
    this.isLoading = true;
    this.taskService.GetAllTasks().subscribe({
      next: (tasks) => {
        this.listsToShow = tasks;
        this.isLoading = false;
      },
      error: (error) => {
        this.setErrorMessage(error);
        this.isLoading = false;
      },
    });
  }

  // DELETE TASK
  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  // DELETE ALL TASK
  onDeleteAllTask() {
    this.taskService.deleteAllTask();
    // this.isLoading=false
  }

  // UPDATE TASK
  onEditShowClicked(id: string) {
    this.idTaskUpdate = id;
    this.showCreateTaskForm = true;
    this.editMode = true;
    this.selectTask = this.listsToShow.find((e) => e.id == id);
  }
}
