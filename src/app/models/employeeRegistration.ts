import { Person } from "./person";

export class EmployeeRegistration {
    private _employeeRegistrationId: number;
    private _startDate: string;
    private _endDate: string;
    private _employee: Person;
    private _organization: string;
  
    get employeeRegistrationId(): number {
      return this._employeeRegistrationId;
    }
  
    set employeeRegistrationId(value: number) {
      this._employeeRegistrationId = value;
    }
  
    get startDate(): string {
      return this._startDate;
    }
  
    set startDate(value: string) {
      this._startDate = value;
    }
  
    get endDate(): string {
      return this._endDate;
    }
  
    set endDate(value: string) {
      this._endDate = value;
    }
  
    get employee(): Person {
      return this._employee;
    }
  
    set employee(value: Person) {
      this._employee = value;
    }
  
  
    get organization(): string {
      return this._organization;
    }
  
    set organization(value: string) {
      this._organization = value;
    }
  
    mappedTo() {
      return {
        employeeRegistrationId: this._employeeRegistrationId,
        startDate: this._startDate,
        organization: 'LeendersNV',
        endDate: this._endDate,
  
      };
    }
  
    toMapped(object: any) {
      const person = new Person();
      person.personId = object.employeeId;
      this._employeeRegistrationId = object.employeeRegistrationId;
      this._startDate = object.startDate;
      this._endDate = object.endDate;
      this._organization = object.organization;
      this._employee = person;
    }
  }