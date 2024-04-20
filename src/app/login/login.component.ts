import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { LoaderComponent } from '../utility/loader/loader.component';
import { SnackbarComponent } from '../utility/snackbar/snackbar.component';
import { Observable } from 'rxjs';
import { AuthResponse } from '../Models/AuthResponse';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  LoginMode: boolean = true;
  isloading: boolean = false;
  errorMessage: string | null = null;
  authObser: Observable<AuthResponse>;
  authService: AuthService = inject(AuthService);
  router:Router=inject(Router)
  




  onSwitch() {
    this.LoginMode = !this.LoginMode;
  }

  onSubmittedForm(form: NgForm) {
    let email = form.value.email;
    let pass = form.value.password;
    if (this.LoginMode) {
      this.isloading = true;
      this.authObser = this.authService.Login(email, pass);
      // login logic
    } else {
      // register logic
      this.isloading = true;
      this.authObser = this.authService.SignUp(email, pass);
    }

    this.authObser.subscribe({
      next: (res) => {
        this.isloading = false;
        this.router.navigate(['/dashboard/overview'])
      },
      error: (err) => {
        this.isloading = false;
        this.errorMessage = err;
        setTimeout(() => {
          this.errorMessage = null;
        }, 3000);
      },
    });

    form.reset();
  }
}
