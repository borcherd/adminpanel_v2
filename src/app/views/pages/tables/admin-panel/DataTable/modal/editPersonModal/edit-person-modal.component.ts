import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-person-modal',
  templateUrl: './edit-person-modal.component.html'
})
export class EditPersonModalComponent extends NgbModal implements OnInit {

  modalcomponent: NgbModal;

  ngOnInit() {
  }


  /**
   * closes the modal
   */
  modalClose(event){
    this.dismissAll();
  }
 
}
