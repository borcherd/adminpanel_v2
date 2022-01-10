import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TablesComponent } from './tables.component';
<<<<<<< Updated upstream
import { DataTableComponent } from './data-table/data-table.component';

=======
>>>>>>> Stashed changes
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

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
  declarations: [TablesComponent, AdminPanelComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule, CustomFormsModule
  ]
})
export class TablesModule { }
