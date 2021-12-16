export class AppointmentCount {
  private _amount_appointments: number;
  private _year: number;
  private _month: number;
  private _day: number;

  constructor(_amount_appointments: number = 0, _year: number = 0, _month: number = 0, _day: number = 0) {
    this._amount_appointments = _amount_appointments;
    this._year = _year;
    this._month = _month;
    this._day = _day;
  }

  get amount_appointments(): number {
    return this._amount_appointments;
  }

  get year(): number {
    return this._year;
  }

  get month(): number {
    return this._month;
  }

  get day(): number {
    return this._day;
  }

  toMapped(value) {
    this._amount_appointments = value.amount_appointments;
    this._year = value.year;
    this._month = value.month;
    this._day = value.day;
  }
}