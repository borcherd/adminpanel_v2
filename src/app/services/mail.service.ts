import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MailMessage } from '../models/mail-message';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  private url = 'http://localhost/';
  //private url = 'https://api.accretion.be/';
  private basicHeaders = new HttpHeaders({});

  constructor(private httpClient: HttpClient) { }

  /**
   * sends an email to the recipients
   * @param message with all the info of the mail
   * @returns ...
   */
  sendMail(message: MailMessage): Observable<any> {
    return this.httpClient.post<any>(this.url + 'api/v1/emails', message.mappedTo(), {
      headers: this.basicHeaders,
      withCredentials: true

    });
  }
}
