import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';
import { EditPersonModalComponent } from './modal/editPersonModal/edit-person-modal.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  persons: Person[]
  
  private subscription: Subscription = new Subscription();

  constructor(private personService: PersonService, private modalService: NgbModal) {   }

  ngOnInit(): void {
    this.getAllPersons();
  }

  /**
   * Fetches all persons from the database
   */
  getAllPersons() {

    this.subscription.add(this.personService.getAllPersons().subscribe((persons: Person[]) => {
      this.persons = persons;
      console.log(persons);
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    }));
    console.log(this.persons)
    
  }

  onActivate(event) {
    if(event.type == 'click') {
        console.log(event.row);
        const modalNewEvent = this.modalService.open(EditPersonModalComponent);
        modalNewEvent.componentInstance.clickInfo = event;
    }
}
}

