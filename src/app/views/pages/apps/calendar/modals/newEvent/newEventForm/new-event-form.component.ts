import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateSelectArg } from '@fullcalendar/angular';
import { NgbDateStruct, NgbTimepickerConfig, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { Person } from 'src/app/models/person';
import { Role } from 'src/app/models/role';
import { AppointmentService } from 'src/app/services/appointment.service';
import { PersonService } from 'src/app/services/person.service';
import { company } from 'src/app/views/constants';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-new-event-form',
  templateUrl: './new-event-form.component.html',
})
export class NewEventFormComponent implements OnInit {
  currentUser: Person;
  selectedDate: NgbDateStruct;
  time: NgbTimeStruct = {hour: 13, minute: 30, second: 0};
  private subscription: Subscription = new Subscription();

  @Output() submitCloseEvent = new EventEmitter<number>();

  formEvent: FormGroup;
  newCustomerShown: boolean = false;
  customers: Person[];

  appointments: Appointment[];

  @Input()
  clickInfoInput: DateSelectArg;

  constructor(private personService: PersonService, private appointmentService: AppointmentService, config: NgbTimepickerConfig) {
    // customize default values of ratings used by this component tree
    config.seconds = false;
    config.spinners = false;
  }

  ngOnInit() {
    this.fetchAllData();
    this.initForm();
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
    this.customers = customers;
    });
  }

  /**
   * gets the current logged in user
   */
  getCurrentUser(){
    this.subscription.add(this.personService.getCurrentUser().subscribe((employee: Person) => {
      this.currentUser = employee;
    }));
  }

  /**
   * gets all apointments
   */
  getAllAppointments(){
    this.subscription.add(this.appointmentService.getAllAppointments().subscribe((appointments: Appointment[])=>{
      this.appointments = appointments
    }))
  }

  /**
   * initalizes forms to be used in html
   */
  initForm(){
     this.formEvent = new FormGroup({
      startDate: new FormControl({
        year: Number(String(this.clickInfoInput.startStr).substring(0,4)),
        month: Number(String(this.clickInfoInput.startStr).substring(5,7)), 
        day: Number(String(this.clickInfoInput.startStr).substring(8,10))}, Validators.required),
      startTime: new FormControl({
        hour: Number(String(this.clickInfoInput.startStr).substring(11,13)),
        minute: Number(String(this.clickInfoInput.startStr).substring(14,16)),
        second: 0}, Validators.required),
      endTime:new FormControl({
        hour: Number(String(this.clickInfoInput.endStr).substring(11,13)),
        minute: Number(String(this.clickInfoInput.endStr).substring(14,16)),
        second: 0}, Validators.required),
      endDate: new FormControl({
        year: Number(String(this.clickInfoInput.endStr).substring(0,4)),
        month: Number(String(this.clickInfoInput.endStr).substring(5,7)), 
        day: Number(String(this.clickInfoInput.endStr).substring(8,10))}, Validators.required),
      description:new FormControl('', Validators.required),
      new_customer: new FormControl(false), 
      customer_list: new FormControl(''),
    }) ;

    this.new_customer.valueChanges.subscribe(checked => {
      if (checked) {
        this.formEvent.addControl('customer_email', new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]));
        this.formEvent.addControl('customer_name', new FormControl('', Validators.required));
        this.formEvent.addControl('customer_firstName', new FormControl('', Validators.required));
        this.formEvent.addControl('customer_company', new FormControl('', Validators.required));
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
        this.formEvent.addControl('customer_list', new FormControl('', Validators.required));
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
      const customer = this.createNewCustomer();
    }else{
      this.createNewEvent();
    }
    this.submitCloseEvent.emit(1)
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
    const startDateTime = this.createDateTime(this.formEvent.controls['startDate'].value, this.formEvent.controls['startTime'].value)
    const endDateTime = this.createDateTime(this.formEvent.controls['endDate'].value, this.formEvent.controls['endTime'].value)
    const appointment = new Appointment(
      startDateTime,
      endDateTime,
      true,
      this.formEvent.controls['description'].value,
      this.currentUser, //this.employe when logging in works
      null)
    if (customer = null){
      appointment.customer = customer
    } else{
      appointment.customer = this.formEvent.controls['customer_list'].value;
    }
    this.subscription.add(this.appointmentService.createAppointment(appointment).subscribe(() => {
      Swal.fire({
        title: 'Succes!',
        text: 'Evenement aangemaakt!',
        icon: 'success',
        confirmButtonText: 'Cool',
        toast: true,
        position: 'top-end',
        showConfirmButton:false,
        timer:1113000
      }) 
    }));
  }

  /**
   * turns the input from the date and timepicker into a formatted date
   * @param date to format
   * @param time to format
   * @returns formatted datetime
   */
  createDateTime(date, time){
    ;
    const DateTime = date.year + "-" +
    this.checkDoubleDigits(date.month) + "-" +
    this.checkDoubleDigits(date.day) + "T" +
    this.checkDoubleDigits(time.hour) + ":" + 
    this.checkDoubleDigits(time.minute) + ":" +
    "00" + "+01:00";
    const temp_date = new Date(Date.parse(DateTime));
    temp_date.setHours(temp_date.getHours() + 2);
    return temp_date.toISOString();
  }

  /**
   * checks if the length of arg is 1
   * @param arg to check the length of
   * @returns correct length of arg (has to be 2 for dateobject)
   */
  checkDoubleDigits(arg){
    if (String(arg).length == 1){
      arg = "0" + arg
    }
    return arg
  }

  
}
