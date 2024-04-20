import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { User } from '../Models/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  authService: AuthService = inject(AuthService);
  private userSubject: Subscription;
  public isLogin: boolean=false;
  public isLogout:boolean=false

  ngOnInit() {
    this.userSubject = this.authService.user.subscribe((user: User) => {
      this.isLogin = user ? true : false
      this.isLogout = user ? false : true
    });
  }

  logout() {
    this.authService.Logout();
  }

  ngOnDestroy() {
    this.userSubject.unsubscribe();
  }
}
