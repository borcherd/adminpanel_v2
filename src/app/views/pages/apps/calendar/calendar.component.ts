import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, FullCalendarComponent } from '@fullcalendar/angular';
import { NgbModal, NgbTimepickerConfig, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { editEventModalComponent } from './modals/editEvent/editEventModal/edit-event-modal.component';
import { newEventModalComponent } from './modals/newEvent/newEventModal/new-event-modal.component';
import allLocales from '@fullcalendar/core/locales-all';
import Swal from 'sweetalert2';
import { PersonService } from 'src/app/services/person.service';
import { Person } from 'src/app/models/person';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;
  private subscription: Subscription = new Subscription();
  private utils: Utils = new Utils;
  private currentUser: Person;
  private calendarApi;

  calendarOptions: CalendarOptions = {
    customButtons: {
      previousButton: {
        text: '<',
        click: this.prev.bind(this)

      },
      todayButton: {
        text: 'Today',
        click: this.today.bind(this)
      },
      nextButton: {
        text: '>',
        click: this.next.bind(this)
      },
      monthButton: {
        text: 'Month',
        click: this.month.bind(this)
      },
      weekButton: {
        text: 'Week',
        click: this.week.bind(this)
      },
      dayButton: {
        text: 'Day',
        click: this.day.bind(this)
      },
      listWeekButton: {
        text: 'List',
        click: this.listWeek.bind(this)
      }
    },
    headerToolbar: {
      left: 'previousButton,todayButton,nextButton',
      center: 'title',
      right: 'monthButton,weekButton,dayButton,listWeekButton'
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
    eventDragMinDistance:10000, //disable dragging

  };
  basicModalCloseResult: string = '';
  appointments: any[] = [];

  constructor(private modalService: NgbModal, private appointmentService: AppointmentService, private personService: PersonService ) {  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); 
  }

  /**
   * gets the current user
   */
  getCurrentUser(){
    this.subscription.add(this.personService.getCurrentUser().subscribe((employee: Person) => {
      this.currentUser = employee;
      this.calendarApi = this.fullcalendar.getApi();
      this.getAppointments(); 
    }));
  }

  /**
   * gets all appointments for the current user 
   */
  getAppointments(){
    const weekRange = this.getDates();
    this.calendarOptions.events = null
    const appointments: any[] = [];
    this.subscription.add(this.personService.getAppointments(this.currentUser.personId, weekRange[0], weekRange[1]).subscribe((rAppointment:Appointment[])=>{
      rAppointment.forEach(appointment => {
        const translated = this.utils.translateAppointment(appointment)
        appointments.push(translated)
      });
      this.appointments = appointments;
      this.calendarOptions.events = this.appointments
    }))
  }

  getDates(){
    const view = this.calendarApi.view.type;
    const currentDate = this.calendarApi.getDate();
    console.log(view)
    var range;
    switch (view) {
      case "timeGridWeek":
        range = this.utils.getWeekRange(currentDate)
        break;
      case "dayGridMonth":
        range = this.utils.getMonthRange(currentDate)
        break;
      case "timeGridDay":
        range = this.utils.getDayRange(currentDate)
        break;
      case "listWeek":
        range = this.utils.getWeekRange(currentDate)
        break;
    }
    console.log(range)
    return range
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
          }else if (typeof(response) == "object"){
            this.createAppointment(response);
          }
          else{
            console.log("canceled")
          }
        })
        break;
      case 2:
        const modalEditEvent = this.modalService.open(editEventModalComponent);
        modalEditEvent.componentInstance.clickInfo = info;
        modalEditEvent.dismissed.subscribe(rEvent =>{
          if (Array.isArray(rEvent)){
            this.updateAppointment(rEvent)
          }else if (typeof(rEvent) == "number"){
            this.deleteAppointment(rEvent)
          }else{
            console.log("canceled")
          }
        })
        break;
    }
  }

  /**
   * creates a new appointment in the backend with the given appointment
   * @param rAppointment to push to the backend
   */
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
      this.getAppointments() 
    }));
  }

  /**
   * creates a new customer with the given values
   * @param rAppointment to create an appointment after creating a customer
   * @param rCustomer to create a customer
   */
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

  /**
   * deletes the appointment with the given id
   * @param event id of the appointment
   */
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
      this.getAppointments()
    }))
  }

  /**
   * updates the appointment with the given id
   * @param event [id, appointment]
   */
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
      this.getAppointments()
    })) 
  }

  prev(){
    this.calendarApi.prev();
    this.getAppointments();
  }

  today(){
    this.calendarApi.today();
    this.getAppointments();
  }

  next(){
    this.calendarApi.next();
    this.getAppointments();
  } 

  month(){
    this.calendarApi.changeView("dayGridMonth");
    this.getAppointments();
  }
  
  week(){
    this.calendarApi.changeView("timeGridWeek");
    this.getAppointments();
  }

  day(){
    this.calendarApi.changeView("timeGridDay");
    this.getAppointments();
  }

  listWeek(){
    this.calendarApi.changeView("listWeek");
    this.getAppointments();
  }
  
}
