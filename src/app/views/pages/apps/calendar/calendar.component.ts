import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { editEventModalComponent } from './modals/editEvent/editEventModal/edit-event-modal.component';
import { newEventModalComponent } from './modals/newEvent/newEventModal/new-event-modal.component';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,today,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'timeGridWeek',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];
  basicModalCloseResult: string = '';


  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  /**
  * Function to create new event
  * @param selectInfo: info of the selected moment 
  */
  handleDateSelect(selectInfo: DateSelectArg) {   
    console.log(selectInfo)
    console.log("handleDateSelect")
    this.openModal(1, selectInfo)
    
    /*const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    } */
  }

  /**
   * Function when clicked on an event to edit
   * @param clickInfo: info of the clicked event
   */
  handleEventClick(clickInfo: EventClickArg) {
    console.log("handleEventClick")
    this.openModal(2, clickInfo)
    
  }

  /**
   * Function to add all events to calender
   * @param events: all events
   */
  handleEvents(events: EventApi[]) {
    console.log("handleEvents");
    console.log(events)
    this.currentEvents = events;
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
}
