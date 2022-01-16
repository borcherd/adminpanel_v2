import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { NgbModal, NgbTimepickerConfig, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { editEventModalComponent } from './modals/editEvent/editEventModal/edit-event-modal.component';
import { newEventModalComponent } from './modals/newEvent/newEventModal/new-event-modal.component';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  private subscription: Subscription = new Subscription();

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

  constructor(private modalService: NgbModal, private appointmentService: AppointmentService,) {  }

  ngOnInit(): void {
    this.getAllAppointments();
  }

  /**
   * gets all appointments from the database
   */
  getAllAppointments(){
    this.subscription.add(this.appointmentService.getAllAppointments().subscribe((appointments2: Appointment[])=>{
      appointments2.forEach(appointment => {
        const translated = this.translateAppointment(appointment)
        this.appointments.push(translated)
      });
      this.calendarOptions.events = this.appointments
      console.log(this.appointments)
    }))  
    
  }

  /**
  * Function to create new event
  * @param selectInfo: info of the selected moment 
  */
  handleDateSelect(selectInfo: DateSelectArg) {   
    console.log(selectInfo)
    console.log("handleDateSelect")
    this.openModal(1, selectInfo)
  }

  /**
   * Function when clicked on an event to edit
   * @param clickInfo: info of the clicked event
   */
  handleEventClick(clickInfo: EventClickArg) {
    console.log("handleEventClick")
    console.log(clickInfo)
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
        break;
      case 2:
        const modalEditEvent = this.modalService.open(editEventModalComponent);
        modalEditEvent.componentInstance.clickInfo = info;
        break;
    }
  }

  /**
   * translates the appointment to an event for the callender
   * @param appointment to translate
   * @returns an event for the callender
   */
  translateAppointment(appointment:Appointment){   
    return {
      id: appointment.appointmentId,
      start: appointment.startDate,
      end: appointment.endDate,
      title: appointment.info,
      backgroundColor: 'rgba(0,204,204,.25)',
      borderColor: '#00cccc'
    }

  }
}
