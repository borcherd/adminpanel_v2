import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Appointment } from '../models/appointment';
import { IdWrapper } from '../models/idWrapper';
import { Person } from '../models/person';
import { ProfilePicture } from '../models/profilePicture';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private url = 'http://localhost/';
  //private url = 'https://api.accretion.be/';
  private basicHeaders = new HttpHeaders({});

  constructor(private httpClient: HttpClient) { }

  /**
   * gets all persons from the database
   * @returns an array of persons
   */
  getAllPersons(): Observable<Person[]> {
    return this.httpClient.get<Person[]>(this.url + 'api/v1/persons', {
      headers: this.basicHeaders,
      withCredentials: true
    }).pipe(
    map((values: any[]) => {
      const persons = [];
      values.forEach(value => {
        const newPerson = new Person();
        newPerson.toMapped(value);
        persons.push(newPerson);
      });
      return persons;
    }));
  }


  /**
   * gets all persons of a certain role 
   * @param role of the person (employee, customer, admin)
   * @returns an array of persons
   */
  getAllPersonsByRole(role: String): Observable<Person[]> {
    return this.httpClient.get<Person[]>(this.url + 'api/v1/persons/role/' + role, {
      headers: this.basicHeaders,
      withCredentials: true,
    }).pipe(
      map((values: any[]) => {
        const persons = [];
        values.forEach(value => {
          const newPerson = new Person();
          newPerson.toMapped(value);
          persons.push(newPerson);
        });
        return persons;
      }));
  }

  /**
   * gets the person with the corresponding id
   * @param id of the person
   * @param headers null
   * @returns the person with the correstponding id
   */
  getPersonById(id: number, headers: HttpHeaders = null): Observable<Person> {
    let usingHeaders = this.basicHeaders;

    if (headers !=  null) {
      usingHeaders = headers;
    }

    return this.httpClient.get<Person>(this.url + 'api/v1/persons/' + id, {
      headers: usingHeaders,
      withCredentials: true

    }).pipe(
      map((p: any) => {
        const person = new Person();
        person.toMapped(p);
        return person;
      }),
    );
  }

  /**
   * gets persons with the corresponding ids
   * @param ids of the persons  
   * @returns an array of persons
   */
  getPersonsByIds(ids: IdWrapper[]): Observable<Person[]> {
    console.log(ids.map((id: IdWrapper) => id.mappedTo()));
    return this.httpClient.post<Person[]>(this.url + 'api/v1/persons/ids', ids.map((id: IdWrapper) => id.mappedTo())
      , {
        headers: this.basicHeaders,
        withCredentials: true

      });
  }

  /**
   * gets the profilepicture of a person
   * @param id of the person
   * @returns the profile picture
   */
  getPersonProfilePicture(id: number): Observable<ProfilePicture> {
    return this.httpClient.get<ProfilePicture>(this.url + 'api/v1/persons/' + id + '/photo',
      {
        headers: this.basicHeaders,
        withCredentials: true

      });
  }

  /**
   * gets the person by their email
   * @param email of the person
   * @returns a person
   */
  getPersonByEmail(email: string): Observable<Person> {
    return this.httpClient.post<Person>(this.url + 'api/v1/persons/email/', { email: email }
    , {
        headers: this.basicHeaders,
        withCredentials: true

      });
  }

  /**
   * updates the data of the person
   * @param id of the person
   * @param person the updated data of the person
   * @param headers null  
   * @returns the updated person
   */
  updatePerson(id: number, person: Person, headers: HttpHeaders = null): Observable<Person> {
    let usingHeaders = this.basicHeaders;

    if (headers !=  null) {
      usingHeaders = headers;
    }
    return this.httpClient.put<Person>(this.url + 'api/v1/persons/' + id, person.mappedTo()
      , {
        headers: usingHeaders,
        withCredentials: true,

      });
  }

  /**
   * gets the total count of employees
   * @returns the count of employees
   */
  getAllEmployeeCount(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'api/v1/persons/count/global/employees', {
      headers: this.basicHeaders,
      withCredentials: true

    });
  }

  /**
   * creates a new instance of person 
   * @param person the data of the new instance
   * @returns the newly created person
   */
  createPerson(person: Person): Observable<Person> {
    return this.httpClient.post<Person>(this.url + 'api/v1/persons', person.mappedTo()
      , {
        headers: this.basicHeaders,
        withCredentials: true

      });
  }

  /**
   * delete the person with the corresponding id
   * @param id of the person to delete
   * @returns the deleted person
   */
  deletePerson(id: number): Observable<Person> {
    return this.httpClient.delete<any>(this.url + 'api/v1/persons/' + id
      , {
        headers: this.basicHeaders,
        withCredentials: true

      });
  }

  /**
   * gets the person by their faceid
   * @param id the faceid of the person
   * @returns the corresponding person
   */
  getPersonByPersonFaceId(id: string): Observable<Person> {
    return this.httpClient.get<Person>(this.url + 'api/v1/persons/personfaceid/' + id,
      {
        headers: this.basicHeaders,
        withCredentials: true

      }).pipe(map((value: any) => {
        if (value != null) {
          const person = new Person();
          person.toMapped(value);
          console.log(value);
          return person;
        }
        return null;
      }));
  }

  /**
   * gets the current user
   * @returns the current user
   */
  getCurrentUser(): Observable<Person> {
    return this.httpClient.get<Person>(this.url + 'api/v1/persons/me', {
      headers: this.basicHeaders,
      withCredentials: true

    })
      .pipe(map((value: any) => {
      if (value != null) {
        const person = new Person();
        person.toMapped(value);

        const appointments = [];
        person.appointments.forEach(appValue => {
          const newAppointment = new Appointment();
          newAppointment.toMapped(appValue);
          appointments.push(newAppointment);

        });
        // person.appointments.map(obj => {
        //   return new Appointment().toMapped(obj);
        // });
        person.appointments = appointments;

        return person;
      }
      return null;
    }));
  }
}
