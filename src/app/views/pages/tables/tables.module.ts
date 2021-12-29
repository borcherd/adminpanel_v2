import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { DataTableComponent } from './data-table/data-table.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';

const routes: Routes = [
  {
    path: '',
    component: TablesComponent,
    children: [
      {
        path: '',
        redirectTo: 'data-table',
        pathMatch: 'full'
      },
      {
        path: 'data-table',
        component: DataTableComponent
      },
    ]
  }
]

@NgModule({
  declarations: [TablesComponent, DataTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule, CustomFormsModule
  ]
})
export class TablesModule { }
