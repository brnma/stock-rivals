import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.auth.getUserVal;

    // Checking email cause typescript is being too strict
    // so i cant set null for user
    // thus checking if email length is 0 or not
    if (currentUser !== undefined && currentUser.email.length !== 0) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
