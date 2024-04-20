import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  http: HttpClient = inject(HttpClient);

  logError(data: { statusCode: number; errorMessage: string; datetime: Date }) {
    this.http
      .post(
        'https://angularhttpclient-b768b-default-rtdb.firebaseio.com/log.json',
        data
      )
      .subscribe();
  }

  fetchError() {
    return this.http
      .get(
        'https://angularhttpclient-b768b-default-rtdb.firebaseio.com/log.json'
      )
      .subscribe((err) => {
        console.log(err);
      });
  }
}
