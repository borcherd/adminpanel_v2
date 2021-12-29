import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment';
import { map } from 'rxjs/operators';
import { AppointmentCount } from '../models/appointmentCount';
import { basicHeaders, url } from './constants';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private httpClient: HttpClient) { }

  /**
   * gets all appointments from the database
   * @returns an array of appointments
   */
  getAllAppointments(): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(url + 'api/v1/appointments', {
      headers: basicHeaders,
      withCredentials: true

    }).pipe(
      map((values: any[]) => {
        const appointments = [];
        values.forEach(value => {
          const newAppointment = new Appointment();
          newAppointment.toMapped(value);
          appointments.push(newAppointment);
        });
        return appointments;
      }));
  }

  /**
   * gets all appointments from the database filtered by a date
   * @param year of the date
   * @param month of the date
   * @param day of the date
   * @returns an array of appointments
   */
  getAppointmentsByDate(year, month, day): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(url + 'api/v1/appointments' + '/date/' + year + '/'
      + month + '/' + day, {
      headers: basicHeaders,
      withCredentials: true

    }).pipe(
      map((values: any[]) => {
        const appointments = [];
        values.forEach(value => {
          const newAppointment = new Appointment();
          newAppointment.toMapped(value);
          appointments.push(newAppointment);
        });
        return appointments;
      }));
  }

  /**
   * gets the appointment from the id
   * @param id of the appointment
   * @returns one appointment
   */
  getAppointmentById(id: number): Observable<Appointment> {
    return this.httpClient.get<Appointment>(url + 'api/v1/appointments/' + id, {
      headers: basicHeaders,
      withCredentials: true

    });
  }

  /**
   * gets all appointments within a specified range by day
   * @param startDate startdate of the range
   * @param endDate enddate of the range
   * @returns an array of appointments within the range
   */
  getAppointmentsDayCountByDateRange(startDate: string, endDate: string): Observable<AppointmentCount[]> {
    return this.httpClient.get<AppointmentCount[]>(url + 'api/v1/appointments/count/day/start/' + startDate + '/end/'
      + endDate, {
      headers: basicHeaders,
      withCredentials: true

    }).pipe(
      map((values: any[]) => {
        const count = [];
        values.forEach(value => {
          const newAppointmentCount = new AppointmentCount();
          newAppointmentCount.toMapped(value);
          count.push(newAppointmentCount);
        });
        return count;
      }));
  }

  /**
   * gets all appointments within a specified range by month
   * @param startDate startdate of the range
   * @param endDate enddate of the range
   * @returns an array of appointments within the range
   */
  getAppointmentsMonthCountByDateRange(startDate: string, endDate: string): Observable<AppointmentCount[]> {
    return this.httpClient.get<AppointmentCount[]>(url + 'api/v1/appointments/count/month/start/' + startDate + '/end/'
      + endDate, {
      headers: basicHeaders,
      withCredentials: true

    }).pipe(
      map((values: any[]) => {
        const count = [];
        values.forEach(value => {
          const newAppointmentCount = new AppointmentCount();
          newAppointmentCount.toMapped(value);
          count.push(newAppointmentCount);
        });
        return count;
      }));
  }

  /**
   * updates the appointment with the given id
   * @param id of the appointment to update
   * @param appointment the updated appointment
   * @returns the updated appointment
   */
  updateAppointment(id: number, appointment: Appointment): Observable<Appointment> {
    return this.httpClient.put<Appointment>(url + 'api/v1/appointments/' + id, appointment.mappedTo()
      , {
        headers: basicHeaders,
        withCredentials: true

      });
  }

  /**
   * creates a new appointment
   * @param appointment the appointment to create
   * @returns the created appointment 
   */
  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.httpClient.post<Appointment>(url + 'api/v1/appointments', appointment.mappedTo()
      , {
        headers: basicHeaders,
        withCredentials: true

      }).pipe(map((value: any) => {
        console.log(value);
        const appoint = new Appointment();
        appoint.toMapped(value);
        return appoint;
    }));
  }

  deleteAppointment(id: number): Observable<Appointment> {
    return this.httpClient.delete<any>(url + 'api/v1/appointments/' + id
      , {
        headers: basicHeaders,
        withCredentials: true

      });
  }


}

