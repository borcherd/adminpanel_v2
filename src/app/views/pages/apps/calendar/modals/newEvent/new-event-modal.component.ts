import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Appointment } from 'src/app/models/appointment';


@Component({
  selector: 'app-new-event-modal',
  templateUrl: './new-event-modal.component.html'
})

export class newEventModalComponent  extends NgbModal implements OnInit{

    modalcomponent: NgbModal;
    newAppointment: Appointment;
    newEventForm: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  modalClose(): void{
      this.dismissAll()
  }

  modalSave(){
    
    //this.newAppointment = new Appointment();
  } 

  initForm(){
     this.newEventForm = new FormGroup({
      startDateTime: new FormControl(),
      endDateTime: new FormControl(),
      employee:new FormControl(),
      customer:new FormControl()
    }) ;
  }

  newEvent(e):void{
    console.log(this.newEventForm)
    console.log("hier")
  }
 }
