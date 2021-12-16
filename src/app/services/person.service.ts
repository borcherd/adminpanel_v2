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

  getPersonsByIds(ids: IdWrapper[]): Observable<Person[]> {
    console.log(ids.map((id: IdWrapper) => id.mappedTo()));
    return this.httpClient.post<Person[]>(this.url + 'api/v1/persons/ids', ids.map((id: IdWrapper) => id.mappedTo())
      , {
        headers: this.basicHeaders,
        withCredentials: true

      });
  }

  getPersonProfilePicture(id: number): Observable<ProfilePicture> {
    return this.httpClient.get<ProfilePicture>(this.url + 'api/v1/persons/' + id + '/photo',
      {
        headers: this.basicHeaders,
        withCredentials: true

      });
  }

  getPersonByEmail(email: string): Observable<Person> {
    return this.httpClient.post<Person>(this.url + 'api/v1/persons/email/', { email: email }
    , {
        headers: this.basicHeaders,
        withCredentials: true

      });
  }

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

  getAllEmployeeCount(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'api/v1/persons/count/global/employees', {
      headers: this.basicHeaders,
      withCredentials: true

    });
  }

  
  createPerson(person: Person): Observable<Person> {
    return this.httpClient.post<Person>(this.url + 'api/v1/persons', person.mappedTo()
      , {
        headers: this.basicHeaders,
        withCredentials: true

      });
  }

  deletePerson(id: number): Observable<Person> {
    return this.httpClient.delete<any>(this.url + 'api/v1/persons/' + id
      , {
        headers: this.basicHeaders,
        withCredentials: true

      });
  }

  
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
