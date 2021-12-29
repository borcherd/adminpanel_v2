import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-event-form',
  templateUrl: './new-event-form.component.html',
})
export class NewEventFormComponent implements OnInit {

    formEvent: FormGroup;
    formCustomer: FormGroup;
    newCustomerShown: boolean = false;

    constructor(){
    }

  ngOnInit() {
    this.initForms();
  }

  /**
   * initalizes forms to be used in html
   */
  initForms(){
     this.formEvent = new FormGroup({
      startDateTime: new FormControl('', Validators.required),
      endDateTime: new FormControl('', Validators.required),
      description:new FormControl('', Validators.required),
      customer:new FormControl('')
    }) ;
    this.formCustomer = new FormGroup({
      email: new FormControl('', Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')),
      naam: new FormControl(''),
      voornaam: new FormControl(''),
      bedrijf: new FormControl('')
    })
  }

  /**
   * registers a new event (and if needed a new customer)
   */
  newEvent(){
    console.log(this.formEvent);
    console.log(this.formCustomer);
  }

  /**
   * function to show the div containing the input values of a new customer
   */
  toggleShow(){
    this.newCustomerShown = !this.newCustomerShown;
  }
}
