export class Package {
  private _packageId: number;
  private _description: string;
  private _barCode: string;
  private _receiveDate: string;
  private _delivered: boolean;
  private _employeeId: number;

  constructor(_description: string, _barCode: string, _receiveDate: string, _delivered: boolean,
              _employeeId: number) {
    this._description = _description;
    this._barCode = _barCode;
    this._receiveDate = _receiveDate;
    this._delivered = _delivered;
    this._employeeId = _employeeId;
  }

  get packageId(): number {
    return this._packageId;
  }

  set packageId(value: number) {
    this._packageId = value;
  }

  get description(): string {
    return this._description;
  }

  get barCode(): string {
    return this._barCode;
  }

  get receiveDate(): string {
    return this._receiveDate;
  }

  get delivered(): boolean {
    return this._delivered;
  }

  get employeeId(): number {
    return this._employeeId;
  }
}
