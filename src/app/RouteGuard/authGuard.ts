import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const canActivate = (
  router: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const route = inject(Router);
  return authService.user.pipe(
    map((user) => {
      const IfUserLogin = user ? true : false;
      if (IfUserLogin) {
        return true;
      } else {
        return route.createUrlTree(['/login']);
      }
    })
  );
};
