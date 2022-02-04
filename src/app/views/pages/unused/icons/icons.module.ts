import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


import { IconsComponent } from './icons.component';
import { FeatherComponent } from './feather/feather.component';
import { FlagComponent } from './flag/flag.component';
import { MdiComponent } from './mdi/mdi.component';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';

const routes: Routes = [
  {
    path: '',
    component: IconsComponent,
    children: [
      {
        path: '',
        redirectTo: 'feather-icons',
        pathMatch: 'full'
      },
      {
        path: 'feather-icons',
        component: FeatherComponent
      },
      {
        path: 'flag-icons',
        component: FlagComponent
      },
      {
        path: 'mdi-icons',
        component: MdiComponent
      }
    ]
  }
]

@NgModule({
  declarations: [IconsComponent, FeatherComponent, FlagComponent, MdiComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeahterIconModule
  ]
})
export class IconsModule { }
