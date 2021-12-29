import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-new-event-modal',
  templateUrl: './new-event-modal.component.html'
})

export class newEventModalComponent extends NgbModal implements OnInit{

    modalcomponent: NgbModal;

  ngOnInit() {
  }

  /**
   * closes the modal
   */
  modalClose(){
    this.dismissAll();
  }

 }
