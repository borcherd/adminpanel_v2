import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventClickArg } from '@fullcalendar/core';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { Person } from 'src/app/models/person';
import { AppointmentService } from 'src/app/services/appointment.service';
import { PersonService } from 'src/app/services/person.service';

@Component({ 
  selector: 'app-edit-event-form',
  templateUrl: './edit-event-form.component.html'
})
export class EditEventFormComponent implements OnInit {
  private subscription: Subscription = new Subscription();

  @Output() submitCloseEvent = new EventEmitter<number>();
  @Input() clickInfoInput: EventClickArg;

  formEvent: FormGroup;
  currentUser: Person;

  constructor(private appointmentService: AppointmentService, private personService: PersonService){
  }

  ngOnInit() {
    console.log(this.clickInfoInput.event.title)
    this.getCurrentUser();
    this.initForms();
  }

  /**
   * gets the current logged in user
   */
   getCurrentUser(){
    this.subscription.add(this.personService.getCurrentUser().subscribe((employee: Person) => {
      // Setting current user
      this.currentUser = employee;
      console.log(employee);
    }));
  }

  /**
   * initalizes forms to be used 
   */
  initForms(){
    this.formEvent = new FormGroup({
      startDate: new FormControl({
        year: Number(String(this.clickInfoInput.event.startStr).substring(0,4)),
        month: Number(String(this.clickInfoInput.event.startStr).substring(5,7)), 
        day: Number(String(this.clickInfoInput.event.startStr).substring(8,10))}),
      startTime: new FormControl({
        hour: Number(String(this.clickInfoInput.event.startStr).substring(11,13)),
        minute: Number(String(this.clickInfoInput.event.startStr).substring(14,16)),
        second: 0}),
      endTime:new FormControl({
        hour: Number(String(this.clickInfoInput.event.endStr).substring(11,13)),
        minute: Number(String(this.clickInfoInput.event.endStr).substring(14,16)),
        second: 0}),
      endDate: new FormControl({
        year: Number(String(this.clickInfoInput.event.endStr).substring(0,4)),
        month: Number(String(this.clickInfoInput.event.endStr).substring(5,7)), 
        day: Number(String(this.clickInfoInput.event.endStr).substring(8,10))}),
        description:new FormControl(this.clickInfoInput.event.title, Validators.required),
    }) ;
  }

  /**
   * updates the selected appointment
   */
  onSubmit(){
    this.subscription.add(this.appointmentService.getAppointmentById(Number(this.clickInfoInput.event.id)).subscribe((Rappointment: Appointment)=>{  
      this.subscription.add(this.personService.getPersonById(Rappointment.customer.personId).subscribe((r:Person)=>{
        const startDateTime = this.createDateTime(this.formEvent.controls['startDate'].value, this.formEvent.controls['startTime'].value)
        const endDateTime = this.createDateTime(this.formEvent.controls['endDate'].value, this.formEvent.controls['endTime'].value)
        const updated = new Appointment(
          startDateTime,
          endDateTime, 
          true,
          this.formEvent.controls['description'].value,
          this.currentUser, r
        )
        console.log(Rappointment)
        console.log(updated)
        this.subscription.add(this.appointmentService.updateAppointment(Rappointment.appointmentId, updated).subscribe((r:Appointment)=>{
          console.log(r)
          this.submitCloseEvent.emit(1)

        }))
      }))
    }))
  }

  /**
   * deletes the selected appointment
   */
  onDelete(){
    this.subscription.add(this.appointmentService.deleteAppointment(Number(this.clickInfoInput.event.id)).subscribe((appointment:Appointment)=>{
      console.log("deleted appointment")
      this.submitCloseEvent.emit(2)

    }))
  }

  
  /**
   * turns the input from the date and timepicker into a formatted date
   * @param date to format
   * @param time to format
   * @returns formatted datetime
   */ //in utils zetten
   createDateTime(date, time){
    //"2022-01-13T06:00:00"
    console.log(date)
    console.log(time)
    ;
    const DateTime = date.year + "-" +
    this.checkDoubleDigits(date.month) + "-" +
    this.checkDoubleDigits(date.day) + "T" +
    this.checkDoubleDigits(time.hour) + ":" + 
    this.checkDoubleDigits(time.minute) + ":" +
    "00" + "+01:00";
    console.log(DateTime)
    const temp_date = new Date(Date.parse(DateTime));
    console.log(temp_date)
    temp_date.setHours(temp_date.getHours() + 2);
    console.log(temp_date)
    return temp_date.toISOString();
  }

  /**
   * checks if the length of arg is 1
   * @param arg to check the length of
   * @returns correct length of arg (has to be 2 for dateobject)
   */
  checkDoubleDigits(arg){
    console.log(String(arg).length);
    if (String(arg).length == 1){
      arg = "0" + arg
    }
    return arg
  }
}
