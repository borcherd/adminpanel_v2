import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Appointment } from 'src/app/models/appointment';


@Component({
  selector: 'app-new-event-modal',
  templateUrl: './new-event-modal.component.html'
})

 export class newEventModalComponent extends NgbModal implements OnInit{
  
     modalcomponent: NgbModal;
     newAppointment: Appointment;
     formGroup : FormGroup;
     dateModel: Date = new Date();
     stringDateModel: string = new Date().toString();

  ngOnInit(): void {    
    this.formGroup = new FormGroup({
      activeEndDate:  new FormControl(new Date(), {validators: [Validators.required, DateTimeValidator]})
    }, { updateOn: 'change' });
   }


  modalClose(){
      this.dismissAll()
  }

  modalSave(){
    
    this.newAppointment = new Appointment();
  } 
 }

 export const DateTimeValidator = (fc: FormControl) => {
  const date = new Date(fc.value);
  const isValid = !isNaN(date.valueOf());
  return isValid ? null : {
      isValid: {
          valid: false
      }
  };
};