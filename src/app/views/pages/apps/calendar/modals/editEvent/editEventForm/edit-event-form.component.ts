import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-event-form',
  templateUrl: './edit-event-form.component.html'
})
export class EditEventFormComponent implements OnInit {

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
    }) ;
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
