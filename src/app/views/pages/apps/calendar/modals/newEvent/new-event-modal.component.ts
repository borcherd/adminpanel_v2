import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-new-event-modal',
  templateUrl: './new-event-modal.component.html'
})

export class newEventModalComponent extends NgbModal implements OnInit{

    modalcomponent: NgbModal;
    form: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  modalClose(): void{
    this.dismissAll();
  }

  initForm(){
     this.form = new FormGroup({
      startDateTime: new FormControl,
      endDateTime: new FormControl,
      description:new FormControl,
      customer:new FormControl
    }) ;
  }

  newEvent(form):void{
    console.log(form);
  }

  get startDateTime() {
    return this.form.get('startDateTime') as FormControl;
  }

  get endDateTime() {
    return this.form.get('endDateTime') as FormControl;
  }

  get description() {
    return this.form.get('description') as FormControl;
  }

  get customer() {
    return this.form.get('customer') as FormControl;
  }
 }
