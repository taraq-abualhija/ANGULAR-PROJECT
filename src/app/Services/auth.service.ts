import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthResponse } from '../Models/AuthResponse';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../Models/User';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  user = new BehaviorSubject<User>(null);
  router: Router = inject(Router);
  private tokenExpiretimer: any;

  SignUp(email: string, password: string) {
    const data = { email: email, password: password, returnSecureToken: true };
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.firebaseAPIKEY,
        data
      )
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.handleCreateUser(res);
        })
      );
  }

  Login(email: string, password: string) {
    const data = { email: email, password: password, returnSecureToken: true };
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.firebaseAPIKEY,
        data
      )
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.handleCreateUser(res);
        })
      );
  }

  handleCreateUser(res) {
    const expiresInTs = new Date().getTime() + +res.expiresIn * 1000;
    const expiresIn = new Date(expiresInTs);
    const user = new User(res.email, res.localId, res.idToken, expiresIn);
    this.user.next(user);
    const expireTime = res.expiresIn * 1000; // in mile second
    this.autoLogout(expireTime);

    localStorage.setItem('user', JSON.stringify(user));
  }

  Logout() {
    this.user.next(null);
    this.router.navigate(['/']);
    const user = localStorage.removeItem('user');

    if (this.tokenExpiretimer) {
      clearTimeout(this.tokenExpiretimer);
    }
    this.tokenExpiretimer = null;
  }

  autoLogin() {
    let user;
    if (typeof localStorage !== 'undefined') {
      user = JSON.parse(localStorage.getItem('user'));
    } else {
      console.log('error occured');
    }

    if (!user) {
      return;
    }
    const loggedUser = new User(
      user.email,
      user.id,
      user._token,
      user._expiresIn
    );
    if (loggedUser.token) {
      this.user.next(loggedUser);
      const timerValue =
        new Date(user._expiresIn).getTime() - new Date().getTime();
      this.autoLogout(timerValue);
    }
  }

  autoLogout(expireTime: number) {
    this.tokenExpiretimer = setTimeout(() => {
      this.Logout();
    }, expireTime);
  }

  handleError(err) {
    console.log(err);
    let errorMsg = 'Unknown error was occured';

    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'EMAIL IS EXISTS';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMsg = 'OPERATION IS NOT ALLOWED';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMsg = 'EMAIL or Password is incorrect'.toUpperCase();
    }

    return throwError(() => errorMsg);
  }
}
