import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
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
  @ViewChild(DatatableComponent) table: DatatableComponent;
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  persons: Person[]
  temp:Person[];
  
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
      this.temp = [...persons]
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

  /**
   * function to filter the existing persons on name
   * @param event containing the text to filter 
   */
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d) {
      return d.firstName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.persons = temp;
    this.table.offset = 0;
  }
}
