import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register_old/register.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

import { LoginRedirectComponent } from "./login-redirect/login-redirect.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { SuccessComponent } from './success/success.component';

const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'logout',
      component: LogoutComponent,
    },
    {
      path: 'redirect',
      component: LoginRedirectComponent,
    },
    {
      path: 'success',
      component: SuccessComponent,
    },
    {
      path: '',
      redirectTo: 'login',
    },
  ],
}];

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthComponent, SuccessComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
