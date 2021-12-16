export class MailMessage {
  private _subject: string;
  private _importance: string;
  private _content: string;
  private _recipients: string[];


  constructor(subject: string = '', importance: string = '', content: string = '', recipients: string[] = []) {
    this._subject = subject;
    this._importance = importance;
    this._content = content;
    this._recipients = recipients;
  }


  get subject(): string {
    return this._subject;
  }

  set subject(value: string) {
    this._subject = value;
  }

  get importance(): string {
    return this._importance;
  }

  set importance(value: string) {
    this._importance = value;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  get recipients(): string[] {
    return this._recipients;
  }

  set recipients(value: string[]) {
    this._recipients = value;
  }

  mappedTo() {
    return {
      subject: this._subject,
      importance: this._importance,
      content: this._content,
      recipients: this._recipients,
    };
  }
}
