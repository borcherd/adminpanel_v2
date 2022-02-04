import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AngularCropperjsModule } from 'angular-cropperjs';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AdvancedUiComponent } from './advanced-ui.component';
import { SweetAlertComponent } from './sweet-alert/sweet-alert.component';

const routes: Routes = [
  {
    path: '',
    component: AdvancedUiComponent,
    children: [
      {
        path: '',
        redirectTo: 'cropper',
        pathMatch: 'full'
      },
      {
        path: 'sweet-alert',
        component: SweetAlertComponent
      }
    ]
  }
]

@NgModule({
  declarations: [AdvancedUiComponent, SweetAlertComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularCropperjsModule,
    CarouselModule,
    SweetAlert2Module.forRoot(),
  ]
})
export class AdvancedUiModule { }