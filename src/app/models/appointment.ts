import { Person } from "./person";

export class Appointment {
    private _appointmentId: number;
    private _startDate: string;
    private _endDate: string;
    private _attendant: boolean;
    private _info: string;
    private _employee: Person;
    private _customer: Person;
    private _organization: string;
  
    constructor( _startDate: string = '', _endDate: string = '', _attendant: boolean = false, _info: string = '',
                 _employee: Person = null, _customer: Person = null) {
      this._startDate = _startDate;
      this._endDate = _endDate;
      this._attendant = _attendant;
      this._info = _info;
      this._employee = _employee;
      this._customer = _customer;
    }
  
    get appointmentId(): number {
      return this._appointmentId;
    }
  
    set appointmentId(value: number) {
      this._appointmentId = value;
    }
  
    set startDate(value: string) {
      this._startDate = value;
    }
  
    get startDate(): string {
      return this._startDate;
    }
  
    set endDate(value: string) {
      this._endDate = value;
    }
  
    get endDate(): string {
      return this._endDate;
    }
  
    get attendant(): boolean {
      return this._attendant;
    }
  
    set info(value: string) {
      this._info = value;
    }
  
    get info(): string {
      return this._info;
    }
  
    set employee(value: Person) {
      this._employee = value;
    }
  
    get employee(): Person {
      return this._employee;
    }
  
    set customer(value: Person) {
      this._customer = value;
    }
  
    get customer(): Person {
      return this._customer;
    }
  
    set organization(value: string) {
      this._organization = value;
    }
  
    get organization(): string {
      return this._organization;
    }
  
    toMapped(value) {
      const employee = new Person();
      employee.personId = value.employee.personId;
  
      const customer = new Person();
      customer.personId = value.customer.personId;
  
      this._appointmentId = value.appointmentId;
      this._attendant = value.attendant;
      this._endDate = value.endDate;
      this._startDate = value.startDate;
      this._info = value.info;
      this._employee = employee;
      this._customer = customer;
      this._organization = value.organization;
    }
  
    mappedTo() {
      return {
        appointmentId: this._appointmentId,
        startDate: this._startDate,
        endDate: this._endDate,
        customerEmail: this._customer.email,
        employeeEmail: this._employee.email,
        attendant: this._attendant,
        organization: this._organization,
        info: this._info,
      };
    }
  
  
  }