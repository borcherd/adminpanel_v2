import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateSelectArg } from '@fullcalendar/angular';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';
 
@Component({
  selector: 'app-new-event-form',
  templateUrl: './new-event-form.component.html',
})
export class NewEventFormComponent implements OnInit {
  private subscription: Subscription = new Subscription();

  @Output() submitCloseEvent = new EventEmitter<number>();

  formEvent: FormGroup;
  newCustomerShown: boolean = false;
  customers: Person[];

  @Input()
  clickInfoInput: DateSelectArg;

  constructor(private customerService: PersonService){}

  ngOnInit() {
    this.initForm();
    // this.getCustomers(); //authenitcation errors grr
    console.log(this.customers)
    console.log(this.clickInfoInput.startStr)
  }

  /**
   * Gets all customers from the database to display in the dropdown box
   */
  getCustomers() {
    this.subscription = this.customerService.getAllPersonsByRole('customer').subscribe(
    (customers: Person[]) => {
    console.log(customers[0].personId);
    this.customers = customers;
    });
  }

  /**
   * initalizes forms to be used in html
   */
  initForm(){
     this.formEvent = new FormGroup({
      startDateTime: new FormControl(this.formatDateTime(this.clickInfoInput.startStr), Validators.required),
      endDateTime: new FormControl(this.formatDateTime(this.clickInfoInput.endStr), Validators.required),
      description:new FormControl('', Validators.required),
      new_customer: new FormControl(false),
      customer_list: new FormControl(''),
    }) ;

    this.new_customer.valueChanges.subscribe(checked => {
      const validators = [Validators.required];
      if (checked) {
        this.formEvent.addControl('customer_email', new FormControl('', validators));
        this.formEvent.addControl('customer_name', new FormControl('', validators));
        this.formEvent.addControl('customer_firstname', new FormControl('', validators));
        this.formEvent.addControl('customer_company', new FormControl('', validators));
        this.formEvent.get('customer_list').clearAsyncValidators();
        this.formEvent.get('customer_list').updateValueAndValidity();
        this.formEvent.removeControl('customer_list');
      } else {
        this.formEvent.get('customer_email').clearAsyncValidators();
        this.formEvent.get('customer_name').clearAsyncValidators();
        this.formEvent.get('customer_firstname').clearAsyncValidators();
        this.formEvent.get('customer_email').updateValueAndValidity();
        this.formEvent.get('customer_name').updateValueAndValidity();
        this.formEvent.get('customer_firstname').updateValueAndValidity();
        this.formEvent.removeControl('customer_email');
        this.formEvent.removeControl('customer_name');
        this.formEvent.removeControl('customer_firstname');
        this.formEvent.removeControl('customer_company');
        this.formEvent.addControl('customer_list', new FormControl('', validators));

      }
    });
  }
  
  get new_customer() {    return this.formEvent.get('new_customer') as FormControl;  }

  get customer_list() {    return this.formEvent.get('customer_list') as FormControl;  }

  get customer_email() {    return this.formEvent.get('customer_email') as FormControl;  }

  get customer_name() {    return this.formEvent.get('customer_name') as FormControl;  }

  get customer_firstname() {    return this.formEvent.get('customer_firstname') as FormControl;  }

  get customer_company() {    return this.formEvent.get('customer_company') as FormControl;  }

  /**
   * registers a new event (and if needed a new customer) and pushes them to the database
   */
  onSubmit(){
    let appointment = new Appointment();
    if(this.newCustomerShown){
      const customer = this.createNewCustomer();
      appointment = this.createNewEvent(customer);
    }else{
      appointment = this.createNewEvent();
    }
    //upload new event and new customer, maybe new function or nested in create functions
    console.log(this.formEvent);

    //this.submitCloseEvent.emit(1)
  }

  /**
   * creates a new customer with the details from the form
   * @returns a new customer
   */
  createNewCustomer(){
    const customer = new Person(
      null, 
      this.formEvent.controls['customer_email'].value, 
      this.formEvent.controls['customer_firstname'].value, 
      this.formEvent.controls['customer_name'].value, 
      this.formEvent.controls['customer_company'].value,
      null); //faceid?

    return customer;
  }

  /**
   * creates a new event 
   * @param customer can be a newly created user, can be null
   * @returns a newly created event
   */
  createNewEvent(customer = null){
    const appointment = new Appointment(
      this.formEvent.controls['startDateTime'].value,
      this.formEvent.controls['endDateTime'].value,
      true,
      this.formEvent.controls['description'].value,
      null, //this.employe when logging in works
      null)
    if (customer = null){
      appointment.customer = customer
    } else{
      appointment.customer = this.formEvent.controls['customer'].value;
    }
    return appointment;

  }

  /**
   * formats the datetimestring from the clickevent into a datetimestring to show in the form
   * @param dateTimeString datetimestring to format
   * @returns a formatted datetimestring
   */
  formatDateTime(dateTimeString:string){
    const date = dateTimeString.substring(0,10)
    const time= dateTimeString.substring(11,19)

    return date + " " + time;
  }
}
