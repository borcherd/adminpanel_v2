import { Component, OnInit } from '@angular/core';
import { DateSelectArg } from '@fullcalendar/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-new-event-modal',
  templateUrl: './new-event-modal.component.html'
})

export class newEventModalComponent extends NgbModal implements OnInit{

    modalcomponent: NgbModal;
    clickInfo: DateSelectArg;

  ngOnInit() {
  }


  /**
   * closes the modal
   */
  modalClose(event){
    this.dismissAll(event);
  }

 }
