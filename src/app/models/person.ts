import { Appointment } from "./appointment";
import { EmployeeRegistration } from "./employeeRegistration";
import { Package } from "./package";
import { Role } from "./role";

export class Person {
    private _personId: number;
    private _role: Role;
    private _email: string;
    private _firstName: string;
    private _lastName: string;
    private _company: string;
    private _embedding: string;
    private _gsm: string;
    private _photo: string;
    private _organization: string;
    private _employeeRegistrations: Array<EmployeeRegistration> = [];
    private _appointments: Array<Appointment> = [];
    private _personFaceId: string;
    private _packages: Package[] = [];
  
    constructor(_role = Role.CUSTOMER, _email: string = '', _firstName: string = '', _lastName: string = '',
                _company: string = '', _personFaceId: string = '') {
      this._role = _role;
      this._email = _email;
      this._firstName = _firstName;
      this._lastName = _lastName;
      this._company = _company;
      this._personFaceId = _personFaceId;
    }
  
    get personId(): number {
      return this._personId;
    }
  
    set personId(value: number) {
      this._personId = value;
    }
  
    get role(): Role {
      return this._role;
    }
  
    set role(value: Role) {
      this._role = value;
    }
  
    get email(): string {
      return this._email;
    }
  
    set email(value: string) {
      this._email = value;
    }
  
    get firstName(): string {
      return this._firstName;
    }
  
    set firstName(value: string) {
      this._firstName = value;
    }
  
    get lastName(): string {
      return this._lastName;
    }
  
    set lastName(value: string) {
      this._lastName = value;
    }
  
    get company(): string {
      return this._company;
    }
  
    set company(value: string) {
      this._company = value;
    }
  
    get embedding(): string {
      return this._embedding;
    }
  
    set embedding(value: string) {
      this._embedding = value;
    }
  
    get gsm(): string {
      return this._gsm;
    }
  
    set gsm(value: string) {
      this._gsm = value;
    }
  
    get photo(): string {
      return this._photo;
    }
  
    set photo(value: string) {
      this._photo = value;
    }
  
    get employeeRegistrations(): Array<EmployeeRegistration> {
      return this._employeeRegistrations;
    }
  
    set employeeRegistrations(value: Array<EmployeeRegistration>) {
      this._employeeRegistrations = value;
    }
  
    get appointments(): Array<Appointment> {
      return this._appointments;
    }
  
    set appointments(value: Array<Appointment>) {
      this._appointments = value;
    }
  
    get personFaceId(): string {
      return this._personFaceId;
    }
  
    set personFaceId(value: string) {
      this._personFaceId = value;
    }
  
  
    get organization(): string {
      return this._organization;
    }
  
    set organization(value: string) {
      this._organization = value;
    }
  
    get packages(): Package[] {
      return this._packages;
    }
  
    set packages(value: Package[]) {
      this._packages = value;
    }
  
    mappedTo() {
      let csAppointments = [];
      let emAppointments = [];
  
      if (this._role === Role.EMPLOYEE || this._role === Role.ADMIN) {
        emAppointments = this._appointments;
      } else {
        csAppointments = this._appointments;
      }
  
      return {
        personId: this._personId,
        role: this._role,
        email: this._email,
        firstName: this._firstName,
        lastName: this._lastName,
        company: this._company,
        gsm: this._gsm,
        embedding: this._embedding,
        personFaceId: this._personFaceId,
        organization: this._organization,
        photo: this._photo,
        employeeAppointments: emAppointments,
        customerAppointments: csAppointments,
        packages: this._packages,
      };
    }
  
    toMapped(value) {
      this._personId = value.personId;
      this._firstName = value.firstName;
      this._lastName = value.lastName;
      this._company = value.company;
      this._gsm = value.gsm;
      this._email = value.email;
      this._photo = value.photo;
      this._personFaceId = value.personFaceId;
      this._role = value.role;
      this._organization = value.organization;
  
      if (this._role === Role.EMPLOYEE || this._role === Role.ADMIN) {
        this._appointments = value.employeeAppointments;
        this._employeeRegistrations = value.employeeRegistrations;
        this._packages = value.packages;
      } else {
        this._appointments = value.customerAppointments;
      }
    }
  }