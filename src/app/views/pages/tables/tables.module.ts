import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TablesComponent } from './tables.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { NewPersonFormComponent } from './admin-panel/NewPersonForm/new-person-form/new-person-form.component';
import { DataTableComponent } from './admin-panel/DataTable/data-table/data-table.component';
import { EditPersonModalComponent } from './admin-panel/DataTable/data-table/modal/editPersonModal/edit-person-modal.component';
import { EditPersonFormComponent } from './admin-panel/DataTable/data-table/modal/editPersonForm/edit-person-form.component';


const routes: Routes = [
  {
    path: '',
    component: TablesComponent,
    children: [
      {
        path: '',
        redirectTo: 'admin-panel',
        pathMatch: 'full'
      },
      {
        path:'admin-panel',
        component: AdminPanelComponent
      }
    ]
  }
]

@NgModule({
  declarations: [TablesComponent, AdminPanelComponent, EditPersonModalComponent, EditPersonFormComponent, NewPersonFormComponent, DataTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule, CustomFormsModule
  ]
})
export class TablesModule { }
