import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateSelectArg } from '@fullcalendar/angular';

@Component({
  selector: 'app-new-event-form',
  templateUrl: './new-event-form.component.html',
})
export class NewEventFormComponent implements OnInit {

    @Output() submitCloseEvent = new EventEmitter<number>();

    formEvent: FormGroup;
    formCustomer: FormGroup;
    newCustomerShown: boolean = false;

    @Input()
    clickInfoInput: DateSelectArg;

    constructor(){}

  ngOnInit() {
    this.initForms();
    console.log(this.clickInfoInput.startStr)
  }

  /**
   * initalizes forms to be used in html
   */
  initForms(){
     this.formEvent = new FormGroup({
      startDateTime: new FormControl(this.formatDateTime(this.clickInfoInput.startStr), Validators.required),
      endDateTime: new FormControl(this.formatDateTime(this.clickInfoInput.endStr), Validators.required),
      description:new FormControl('', Validators.required),
      customer:new FormControl('', Validators.required)
    }) ;
    this.formCustomer = new FormGroup({
      email: new FormControl('', Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')),
      name: new FormControl(''),
      firstName: new FormControl(''),
      company: new FormControl('')
    })
  }

  /**
   * registers a new event (and if needed a new customer)
   */
  newEvent(){
    console.log(this.formEvent);
    console.log(this.formCustomer);

    //this.submitCloseEvent.emit(1)
  }

  /**
   * function to show the div containing the input values of a new customer
   */
  toggleShow(){
    this.newCustomerShown = !this.newCustomerShown;
    console.log(this.newCustomerShown)
    if (!this.newCustomerShown){
      console.log("false")
      this.formEvent.controls['customer'].setValidators(Validators.required);
      this.formEvent.updateValueAndValidity()
      console.log(this.formEvent.controls.customer)
    } else {
      console.log("true")
      this.formEvent.controls['customer'].clearValidators();
      this.formEvent.updateValueAndValidity()
      console.log(this.formEvent.controls.customer)
    }
  }

  formatDateTime(dateTimeString:string){
    const date = dateTimeString.substring(0,10)
    const time= dateTimeString.substring(11,19)

    return date + " " + time;
  }

  createEvent(){
    
  }
}
