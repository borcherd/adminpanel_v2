import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateSelectArg } from '@fullcalendar/angular';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { Person } from 'src/app/models/person';
import { Role } from 'src/app/models/role';
import { AppointmentService } from 'src/app/services/appointment.service';
import { PersonService } from 'src/app/services/person.service';
import { company } from 'src/app/views/constants';
 
@Component({
  selector: 'app-new-event-form',
  templateUrl: './new-event-form.component.html',
})
export class NewEventFormComponent implements OnInit {
  currentUser: Person;
  private subscription: Subscription = new Subscription();

  @Output() submitCloseEvent = new EventEmitter<number>();

  formEvent: FormGroup;
  newCustomerShown: boolean = false;
  customers: Person[];
  customer: Person;

  appointments: Appointment[];

  @Input()
  clickInfoInput: DateSelectArg;

  constructor(private personService: PersonService, private appointmentService: AppointmentService){}

  ngOnInit() {
    this.fetchAllData();
    this.initForm();
    console.log(this.clickInfoInput.startStr)
  }

  fetchAllData(){
    this.getCurrentUser();
    this.getAllAppointments(); 
    this.getCustomers();
  }

  /**
   * Gets all customers from the database to display in the dropdown box
   */
  getCustomers() {
    this.subscription = this.personService.getAllPersonsByRole('customer').subscribe(
    (customers: Person[]) => {
    console.log(customers);
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
        this.formEvent.addControl('customer_firstName', new FormControl('', validators));
        this.formEvent.addControl('customer_company', new FormControl('', validators));
        this.formEvent.get('customer_list').clearAsyncValidators();
        this.formEvent.get('customer_list').updateValueAndValidity();
        this.formEvent.removeControl('customer_list');
      } else {
        this.formEvent.get('customer_email').clearAsyncValidators();
        this.formEvent.get('customer_name').clearAsyncValidators();
        this.formEvent.get('customer_firstName').clearAsyncValidators();
        this.formEvent.get('customer_email').updateValueAndValidity();
        this.formEvent.get('customer_name').updateValueAndValidity();
        this.formEvent.get('customer_firstName').updateValueAndValidity();
        this.formEvent.removeControl('customer_email');
        this.formEvent.removeControl('customer_name');
        this.formEvent.removeControl('customer_firstName');
        this.formEvent.removeControl('customer_company');
        this.formEvent.addControl('customer_list', new FormControl('', validators));

      }
    });
  }
  
  get new_customer() {    return this.formEvent.get('new_customer') as FormControl;  }

  get customer_list() {    return this.formEvent.get('customer_list') as FormControl;  }

  get customer_email() {    return this.formEvent.get('customer_email') as FormControl;  }

  get customer_name() {    return this.formEvent.get('customer_name') as FormControl;  }

  get customer_firstName() {    return this.formEvent.get('customer_firstName') as FormControl;  }

  get customer_company() {    return this.formEvent.get('customer_company') as FormControl;  }

  /**
   * registers a new event (and if needed a new customer) and pushes them to the database
   */
  onSubmit(){
    let appointment = new Appointment();
    if(this.customer_firstName != null){
      console.log("103")
      const customer = this.createNewCustomer();
      
    }else{
      this.createNewEvent();
    }
    //upload new event and new customer, maybe new function or nested in create functions
    //this.submitCloseEvent.emit(1)
  }

  /**
   * creates a new customer with the details from the form
   * @returns a new customer
   */
  createNewCustomer(){
    const customer = new Person(
      Role.CUSTOMER, 
      this.formEvent.controls['customer_email'].value, 
      this.formEvent.controls['customer_firstName'].value, 
      this.formEvent.controls['customer_name'].value, 
      this.formEvent.controls['customer_company'].value,
      null); //faceid?


    customer.organization = company;
    customer.gsm = "000"; //todo: create control for phone number
    this.subscription.add(this.personService.createPerson(customer).subscribe((response: Person) => {
      console.log(response);
      this.createNewEvent(customer);
      //reload page/datatable component when succes
    }))
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
      this.currentUser, //this.employe when logging in works
      null)
    if (customer = null){
      console.log(customer)
      appointment.customer = customer
    } else{
      console.log(this.formEvent.controls['customer_list'].value)
      appointment.customer = this.formEvent.controls['customer_list'].value;
    }
    console.log(appointment)
    this.createAppointment(appointment)
    
  }

  createAppointment(appointment){
    appointment.startDate = this.formatDate(appointment.startDate);
    appointment.endDate = this.formatDate(appointment.endDate);
    this.subscription.add(this.appointmentService.createAppointment(appointment)
    .subscribe((updatedAppointment: Appointment) => {
      console.log('appointment returned from create');
      console.log(updatedAppointment);
    }));
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

  formatDate(date: string) {
    const temp_date = new Date(Date.parse(date));
    temp_date.setHours(temp_date.getHours() + 2);
    return temp_date.toISOString();
  }

  getCurrentUser(){
    this.subscription.add(this.personService.getCurrentUser().subscribe((employee: Person) => {
      // Setting current user
      this.currentUser = employee;
      console.log(employee);
    }));
  }

  getAllAppointments(){
    this.subscription.add(this.appointmentService.getAllAppointments().subscribe((appointments: Appointment[])=>{
      this.appointments = appointments
      console.log(appointments)
    }))
  }
}
