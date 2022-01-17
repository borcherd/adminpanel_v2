import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class DataTableComponent implements OnInit, OnDestroy {
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  persons: Person[]
  
  private subscription: Subscription = new Subscription();

  constructor(private personService: PersonService, private modalService: NgbModal) {   }

  ngOnInit(): void {
    this.getAllPersons();
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Fetches all persons from the database
   */
  getAllPersons() {
    this.subscription.add(this.personService.getAllPersons().subscribe((persons: Person[]) => {
      this.persons = persons;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    }));
    
  }

  /**
   * function called when clicking a row in the datatable, opens a modal
   * @param event to edit or delete
   */
  onActivate(event) {
    if(event.type == 'click') {
        const modalNewEvent = this.modalService.open(EditPersonModalComponent);
        modalNewEvent.componentInstance.clickInfo = event;
        modalNewEvent.dismissed.subscribe(r =>{
          this.getAllPersons()
        })
    }
  }
}