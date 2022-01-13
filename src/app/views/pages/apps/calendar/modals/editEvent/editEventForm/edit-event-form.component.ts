import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventClickArg } from '@fullcalendar/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-event-form',
  templateUrl: './edit-event-form.component.html'
})
export class EditEventFormComponent implements OnInit {
  private subscription: Subscription = new Subscription();

  @Output() submitCloseEvent = new EventEmitter<number>();
  @Input() clickInfoInput: EventClickArg;

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
  onSubmit(){
    console.log(this.formEvent);
    console.log(this.formCustomer);
  }

  /**
   * function to show the div containing the input values of a new customer
   */
  toggleShow(){
    this.newCustomerShown = !this.newCustomerShown;
  }

  onDelete(){
    console.log("delete clicked")
  }
}
