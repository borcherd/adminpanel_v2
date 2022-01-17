import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
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
    this.subscription.add(this.appointmentService.getAllAppointments().subscribe((r: Appointment[])=>{
      this.appointments = r;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);    
      console.log(this.appointments)
    }))
  }
} 
