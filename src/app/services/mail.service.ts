import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MailMessage } from '../models/mail-message';
import { basicHeaders, url } from './constants';


@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private httpClient: HttpClient) { }

  /**
   * sends an email to the recipients
   * @param message with all the info of the mail
   * @returns ...
   */
  sendMail(message: MailMessage): Observable<any> {
    return this.httpClient.post<any>(url + 'api/v1/emails', message.mappedTo(), {
      headers: basicHeaders,
      withCredentials: true

    });
  }
}
