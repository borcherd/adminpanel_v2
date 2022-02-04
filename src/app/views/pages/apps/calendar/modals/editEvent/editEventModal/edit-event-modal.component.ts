import { Component, OnInit, Input } from '@angular/core';
import { EventClickArg } from '@fullcalendar/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-edit-event-modal',
  templateUrl: './edit-event-modal.component.html'
})

 export class editEventModalComponent extends NgbModal implements OnInit{
  modalcomponent: NgbModal;
  clickInfo:EventClickArg;

  ngOnInit() {
  }

  /**
   * closes the modal
   */
   modalClose(event){
    this.dismissAll(event);
  }

 }
