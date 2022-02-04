import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { Person } from 'src/app/models/person';
import { AppointmentService } from 'src/app/services/appointment.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-appointment-table',
  templateUrl: './appointment-table.component.html',
})
export class AppointmentTableComponent implements OnInit {
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  private subscription: Subscription = new Subscription();

  appointments: Appointment[];

  constructor(private appointmentService: AppointmentService, private personService: PersonService) { }

  ngOnInit(): void {
    this.getData();
  }

  /**
   * gets all data from the database
   */
  getData(){
    this.subscription.add(this.appointmentService.getAllAppointments().subscribe((rAppointment: Appointment[])=>{
      let index = 0;
      let index2 = 0;
      rAppointment.forEach(element => {
        this.subscription.add(this.personService.getPersonById(element.customer.personId).subscribe((rPerson:Person)=>{
          rAppointment[index].customer = rPerson;
          index ++;
        }))
        this.subscription.add(this.personService.getPersonById(element.employee.personId).subscribe((rPerson2:Person)=>{
          rAppointment[index].employee = rPerson2;
          index2 ++;
        }))
        element.startDate = element.startDate.substring(0, 19)
        element.endDate = element.endDate.substring(0, 19)

      });

      this.appointments = rAppointment;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 5000);    
    }))
  }
} 
