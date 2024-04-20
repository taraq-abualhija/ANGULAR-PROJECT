import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Task } from '../Models/Task';
import { Subject, catchError, map, throwError } from 'rxjs';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  http: HttpClient = inject(HttpClient);
  errorSubject = new Subject<HttpErrorResponse>();
  log: LogService = inject(LogService);

  createTask(task: Task) {
    this.http
      .post(
        'https://angularhttpclient-b768b-default-rtdb.firebaseio.com/tasks.json',
        task
      )
      .pipe(
        catchError((error) => {
          const errorObj = {
            statusCode: error.status,
            errorMessage: error.message,
            datetime: new Date(),
          };
          this.log.logError(errorObj);
          return throwError(() => error);
        })
      )
      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
  }

  GetAllTasks() {
    return this.http
      .get(
        'https://angularhttpclient-b768b-default-rtdb.firebaseio.com/tasks.json'
      )
      .pipe(
        map((res) => {
          let tasks = [];

          for (let task in res) {
            if (res.hasOwnProperty(task))
              tasks.push({ ...res[task], id: task });
          }
          return tasks;
        }),
        catchError((error) => {
          const errorObj = {
            statusCode: error.status,
            errorMessage: error.message,
            datetime: new Date(),
          };
          this.log.logError(errorObj);
          return throwError(() => error);
        })
      );
  }

  getTaskById(id: string | undefined) {
    return this.http
      .get(
        'https://angularhttpclient-b768b-default-rtdb.firebaseio.com/tasks/' +
          id +
          '.json'
      )
      .pipe(
        map((data) => {
          let task = {};
          task = { ...data };
          return task;
        }),
        catchError((error) => {
          const errorObj = {
            statusCode: error.status,
            errorMessage: error.message,
            datetime: new Date(),
          };
          this.log.logError(errorObj);
          return throwError(() => error);
        })
      );
  }

  deleteTask(id: string) {
    this.http
      .delete(
        'https://angularhttpclient-b768b-default-rtdb.firebaseio.com/tasks/' +
          id +
          '.json'
      )
      .pipe(
        catchError((error) => {
          const errorObj = {
            statusCode: error.status,
            errorMessage: error.message,
            datetime: new Date(),
          };
          this.log.logError(errorObj);
          return throwError(() => error);
        })
      )
      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
  }

  deleteAllTask() {
    this.http
      .delete(
        'https://angularhttpclient-b768b-default-rtdb.firebaseio.com/tasks.json'
      )
      .pipe(
        catchError((error) => {
          const errorObj = {
            statusCode: error.status,
            errorMessage: error.message,
            datetime: new Date(),
          };
          this.log.logError(errorObj);
          return throwError(() => error);
        })
      )
      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
  }

  updateTask(id: string, data) {
    this.http
      .put(
        'https://angularhttpclient-b768b-default-rtdb.firebaseio.com/tasks/' +
          id +
          '.json',
        data
      )
      .pipe(
        catchError((error) => {
          const errorObj = {
            statusCode: error.status,
            errorMessage: error.message,
            datetime: new Date(),
          };
          this.log.logError(errorObj);
          return throwError(() => error);
        })
      )
      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
  }
}
