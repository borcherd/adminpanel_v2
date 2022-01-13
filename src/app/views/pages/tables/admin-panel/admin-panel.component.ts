import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Person } from 'src/app/models/person';
import { DataTable } from "simple-datatables";
import { Subject, Subscription } from 'rxjs';
import { PersonService } from 'src/app/services/person.service';
import { company } from 'src/app/views/constants';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  ngOnInit(): void {
  }
}