import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private apiService: AuthenticationService) {}

  canActivate(): Observable<boolean> {
      return this.apiService.isLoggedIn()
        .pipe(
          map(response => {
              if (response.loggedIn === false ) {
                this.router.navigateByUrl('/auth/login');
                return false;
              }

              return true;
            },
          ),
          catchError(error => {
            this.router.navigateByUrl('/auth/login');
            return of(false);
          }),
        );
  }
}