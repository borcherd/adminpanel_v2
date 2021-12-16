export class IdWrapper {
  private _id: number;

  constructor(_id: number) {
    this._id = _id;
  }


  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  mappedTo() {
    return {
      id: this._id,
    };
  }
}
