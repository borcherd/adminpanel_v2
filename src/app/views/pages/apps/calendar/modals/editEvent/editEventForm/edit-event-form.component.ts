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
      startDateTime: new FormControl(this.formatDateTimeToDisplay(this.clickInfoInput.event.startStr), Validators.required),
      endDateTime: new FormControl(this.formatDateTimeToDisplay(this.clickInfoInput.event.endStr), Validators.required),
      description:new FormControl(this.clickInfoInput.event.title, Validators.required),
    }) ;
  }

  /**
   * updates the selected appointment
   */
  onSubmit(){
    this.subscription.add(this.appointmentService.getAppointmentById(Number(this.clickInfoInput.event.id)).subscribe((appointment: Appointment)=>{
      const updated = new Appointment(
        this.formatDateTimeToPush(this.formEvent.controls['startDateTime'].value),
        this.formatDateTimeToPush(this.formEvent.controls['endDateTime'].value), 
        true, this.formEvent.controls['description'].value,
        this.currentUser, appointment.customer
      )
      updated.appointmentId = appointment.appointmentId;
      console.log(updated)
      this.subscription.add(this.appointmentService.updateAppointment(appointment.appointmentId, updated).subscribe((appointment:Appointment)=>{
        console.log(updated)
      }))
    }))
  }

  /**
   * deletes the selected appointment
   */
  onDelete(){
    this.subscription.add(this.appointmentService.deleteAppointment(Number(this.clickInfoInput.event.id)).subscribe((appointment:Appointment)=>{
      console.log("deleted appointment")
    }))
  }

  /**
   * formats the datetimestring from the clickevent into a datetimestring to show in the form
   * @param dateTimeString datetimestring to format
   * @returns a formatted datetimestring
   */
   formatDateTimeToDisplay(dateTimeString:string){
    const date = dateTimeString.substring(0,10)
    const time= dateTimeString.substring(11,19)

    return date + " " + time;
  }

  /**
   * formats the date to the correct format needed in the database
   * @param date datetimestring to format
   * @returns a formatted date
   */
  formatDateTimeToPush(date: string) {
    const temp_date = date.substring(0,10) + "T" + date.substring(11) + "+01:00" ;
    const temp_date2 = new Date(Date.parse(date));
    temp_date2.setHours(temp_date2.getHours() + 2);
    return temp_date2.toISOString();
  }
}
