import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TablesComponent } from './tables.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { EditPersonModalComponent } from './admin-panel/DataTable/modal/editPersonModal/edit-person-modal.component';
import { EditPersonFormComponent } from './admin-panel/DataTable/modal/editPersonForm/edit-person-form.component';
import { NewPersonFormComponent } from './admin-panel/NewPersonForm/new-person-form.component';
import { DataTableComponent } from './admin-panel/DataTable/data-table.component';
import { AdminGuardService } from 'src/app/services/admin-guard.service';
import { RoleAuthorisationService } from 'src/app/services/role-auth.service';


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
        data: {
          role: 'admin',
        },
        component: AdminPanelComponent,
        canActivate: [AdminGuardService],
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
  ],
  providers: [
    RoleAuthorisationService,
    AdminGuardService,
  ]
})
export class TablesModule { }
