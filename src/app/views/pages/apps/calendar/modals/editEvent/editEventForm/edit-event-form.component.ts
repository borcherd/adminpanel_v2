import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventClickArg } from '@fullcalendar/core';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { Person } from 'src/app/models/person';
import { AppointmentService } from 'src/app/services/appointment.service';
import { PersonService } from 'src/app/services/person.service';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';

@Component({ 
  selector: 'app-edit-event-form',
  templateUrl: './edit-event-form.component.html'
})
export class EditEventFormComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private utils: Utils = new Utils();

  @Output() submitCloseEvent = new EventEmitter<number>();
  @Input() clickInfoInput: EventClickArg;

  formEvent: FormGroup;
  currentUser: Person;

  constructor(private appointmentService: AppointmentService, private personService: PersonService){
  }

  ngOnInit() {
    this.getCurrentUser();
    this.initForms();
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * gets the current logged in user
   */
   getCurrentUser(){
    this.subscription.add(this.personService.getCurrentUser().subscribe((employee: Person) => {
      // Setting current user
      this.currentUser = employee;
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
        const startDateTime = this.utils.createDateTime(this.formEvent.controls['startDate'].value, this.formEvent.controls['startTime'].value)
        const endDateTime = this.utils.createDateTime(this.formEvent.controls['endDate'].value, this.formEvent.controls['endTime'].value)
        const updated = new Appointment(
          startDateTime,
          endDateTime, 
          true,
          this.formEvent.controls['description'].value,
          this.currentUser, r
        )
        this.subscription.add(this.appointmentService.updateAppointment(Rappointment.appointmentId, updated).subscribe((r:Appointment)=>{
          Swal.fire({
            title: 'Succes!',
            text: 'Evenement aangepast',
            icon: 'success',
            confirmButtonText: 'Cool',
            toast: true,
            position: 'top-end',
            showConfirmButton:false,
            timer:5500
          }) 
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
      Swal.fire({
        title: 'Succes!',
        text: 'Evenement verwijderd',
        icon: 'success',
        confirmButtonText: 'Cool',
        toast: true,
        position: 'top-end',
        showConfirmButton:false,
        timer:5500
      }) 
      this.submitCloseEvent.emit(2)

    }))
  }
}
