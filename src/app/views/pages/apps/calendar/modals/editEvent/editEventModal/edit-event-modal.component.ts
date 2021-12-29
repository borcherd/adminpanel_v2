import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-edit-event-modal',
  templateUrl: './edit-event-modal.component.html'
})

 export class editEventModalComponent extends NgbModal implements OnInit{
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
