import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeRegistration } from '../models/employeeRegistration';
import { basicHeaders, url } from './constants';


@Injectable({
  providedIn: 'root'
})
export class EmployeeRegistrationService {

  constructor(private httpClient: HttpClient) { }

  /**
   * gets the employee registration from the database by date and id
   * @param employeeId the employeeid of the employee
   * @param year of the registration of the employee
   * @param month of the registration of the employee
   * @param day of the registration of the employee
   * @returns the registration of the employee
   */
  getEmployeeRegistrationByDateAndEmployeeId(employeeId, year, month, day): Observable<EmployeeRegistration> {
    return this.httpClient.get<EmployeeRegistration>(url + 'api/v1/employeeregistrations/' + employeeId
      + '/date/' + year + '/' + month + '/' + day, {
      headers: basicHeaders,
      withCredentials: true

    });
  }

  /**
   * gets the employee registration from the database by date
   * @param year of the registration of the employee
   * @param month of the registration of the employee
   * @param day of the registration of the employee
   * @returns the registration of the employee
   */
  getEmployeeRegistrationByDate(year, month, day): Observable<EmployeeRegistration[]> {
    return this.httpClient.get<EmployeeRegistration[]>(url + 'api/v1/employeeregistrations' + '/date/' + year + '/'
      + month + '/' + day, {headers: basicHeaders, withCredentials: true}).pipe(
      map((values: any[]) => {
        const registrations = [];
        values.forEach(value => {
          const newEmployeeRegistration = new EmployeeRegistration();
          newEmployeeRegistration.toMapped(value);
          registrations.push(newEmployeeRegistration);
        });
        return registrations;
      }));
  }

  /**
   * gets how long the employee has been registred 
   * @returns the registrationcount
   */
  getEmployeeRegistrationCountToday(): Observable<any> {
    return this.httpClient.get<any>(url + 'api/v1/employeeregistrations' + '/count' + '/global/'
      + 'today', {
      headers: basicHeaders,
      withCredentials: true

    });
  }

/**
 * creates a new employee registration
 * @param employeeRegistration the employeeregistration that has to be created 
 * @param employeeId id of the newly created employeeregistration
 * @returns the employeeregistration
 */  
  createEmployeeRegistration(employeeRegistration: EmployeeRegistration, employeeId: number):
    Observable<EmployeeRegistration> {
    return this.httpClient.post<EmployeeRegistration>(url + 'api/v1/employeeregistrations/employee/' +
      employeeId, employeeRegistration.mappedTo(), {
      headers: basicHeaders,
      withCredentials: true

    });
  }

  //todo: deze service?
  /**
   * get the log of the employeeregistration
   * @param id of the eployee
   * @param registration the registration of the employee
   * @returns the log of the registration
   */
  logOfEmployeeRegisgtration(id: number, registration: EmployeeRegistration) {
    return this.httpClient.put(url + 'api/v1/employeeregistrations/' + id, registration
      , {
        headers: basicHeaders,
        withCredentials: true

      });
  }
}
