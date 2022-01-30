import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {RoleAuthorisationService} from './role-auth.service';

@Injectable()
export class AdminGuardService implements CanActivate {
  constructor(private auth: RoleAuthorisationService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    if (!this.auth.isAuthorised(route.data.role)) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}

// const currentUser = JSON.parse(localStorage.getItem('currentUser'));
// if (currentUser) {
//   // check if route is restricted by role
//   if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
//     // role not authorised so redirect to home page
//     this.router.navigate(['/']);
//     return false;
//   }
//   // authorised so return true
//   return true;
// }
// // not logged in so redirect to login page
// this.router.navigate(['auth/login']);
// return false;
