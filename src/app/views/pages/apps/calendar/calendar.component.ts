import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { NgbModal, NgbTimepickerConfig, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Utils } from 'src/app/utils/utils';
import { editEventModalComponent } from './modals/editEvent/editEventModal/edit-event-modal.component';
import { newEventModalComponent } from './modals/newEvent/newEventModal/new-event-modal.component';
import allLocales from '@fullcalendar/core/locales-all';
import Swal from 'sweetalert2';
import { PersonService } from 'src/app/services/person.service';
import { Person } from 'src/app/models/person';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private utils: Utils = new Utils;

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,today,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'timeGridWeek',
    slotMinTime: "05:00:00",
    slotMaxTime:"22:00:00",
    slotDuration: '00:10:00',
    locales: allLocales,
    locale:"nl",
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventDragMinDistance:10000 //disable dragging
  };
  basicModalCloseResult: string = '';
  appointments: any[] = [];

  constructor(private modalService: NgbModal, private appointmentService: AppointmentService, private personService: PersonService) {  }

  ngOnInit(): void {
    this.getAllAppointments();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * gets all appointments from the database
   */
  getAllAppointments(){
    this.calendarOptions.events = null
    const appointments: any[] = [];
    this.subscription.add(this.appointmentService.getAllAppointments().subscribe((appointments2: Appointment[])=>{
      appointments2.forEach(appointment => {
        const translated = this.utils.translateAppointment(appointment)
        appointments.push(translated)
      });
      this.appointments = appointments;
      this.calendarOptions.events = this.appointments
    }))  
  }

  /**
  * Function to create new event
  * @param selectInfo: info of the selected moment 
  */
  handleDateSelect(selectInfo: DateSelectArg) {   
    this.openModal(1, selectInfo)
  }

  /**
   * Function when clicked on an event to edit
   * @param clickInfo: info of the clicked event
   */
  handleEventClick(clickInfo: EventClickArg) {
    this.openModal(2, clickInfo)
    
  }

  /**
   * Function for opening modal according to the type
   * @param type type of modal (1 for new event, 2 for editing event)
   */
  openModal(type, info):void{  
    
    switch (type) {
      case 1:
        const modalNewEvent = this.modalService.open(newEventModalComponent);
        modalNewEvent.componentInstance.clickInfo = info;
        modalNewEvent.dismissed.subscribe(response =>{
          if (Array.isArray(response)){
            this.createCustomer(response[0], response[1])
          }
          else{
            this.createAppointment(response);
          }
        })
        break;
      case 2:
        const modalEditEvent = this.modalService.open(editEventModalComponent);
        modalEditEvent.componentInstance.clickInfo = info;
        modalEditEvent.dismissed.subscribe(rEvent =>{
          if (Array.isArray(rEvent)){
            this.updateAppointment(rEvent)
          }
          else{
            this.deleteAppointment(rEvent)
          }
        })
        break;
    }
  }

  createAppointment(rAppointment){
    this.subscription.add(this.appointmentService.createAppointment(rAppointment).subscribe(() => {
      Swal.fire({
        title: 'Succes!',
        text: 'Evenement aangemaakt!',
        icon: 'success',
        confirmButtonText: 'Cool',
        toast: true,
        position: 'top-end',
        showConfirmButton:false,
        timer:5000
      })
      this.getAllAppointments() 
    }));
  }

  createCustomer( rAppointment: Appointment, rCustomer: Person){
    //verify moet eigenlijk gebeuren wanneer modal nog open is, maar geeft canceled TODO
    this.subscription.add(this.personService.getPersonByEmail(rCustomer.email).subscribe((response:Person)=>{
      if (response != null) {
        Swal.fire({
          title: 'Failed',
          text: 'Er is al een persoon met dit email adres',
          icon: 'error',
          toast: true,
          position: 'top-end',
          showConfirmButton:false,
          timer:5500
        })
      } else {
        this.subscription.add(this.personService.createPerson(rCustomer).subscribe((response: Person) => {
          rAppointment.customer = rCustomer;
          this.createAppointment(rAppointment)
        }));
      } 
    }))
  }

  deleteAppointment(event){
    this.subscription.add(this.appointmentService.deleteAppointment(event).subscribe((rAppointment:Appointment)=>{
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
      this.getAllAppointments()
    }))
  }

  updateAppointment(event){
    this.subscription.add(this.appointmentService.updateAppointment(event[0], event[1]).subscribe((Rappointment2:Appointment)=>{
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
      this.getAllAppointments()
    })) 
  }
}
