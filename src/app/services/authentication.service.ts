import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { basicHeaders, url } from './constants';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  //todo: contracten ff nalopen met kobe

  /**
   * function to authenticate the current session
   * @returns the loginurl
   */
  authenticate(): Observable<string> {

    return this.httpClient.get<string>(url + 'login');
  }

  /**
   * checks if the invitationtoken is valid
   * @param invitationToken to invoke a authenticationToken
   * @returns the authenticationToken
   */
  isInvitationValid(invitationToken: string): Observable<any> {
    const header = new HttpHeaders({'Authorization': invitationToken});
    return this.httpClient.get<any>(url + 'token', {headers : header});
  }

  /**
   * check if the currents user token is valid
   * @returns token
   */
  isLoggedIn(): Observable<any> {
    return this.httpClient.get<any>(url + 'token/loggedin', {
      headers : basicHeaders,
      withCredentials: true,
    });
  }

  /**
   * logs out the current user
   * @returns logout 
   */
  logout(): Observable<any> {
    return this.httpClient.get<any>(url + 'logout', {
      headers : basicHeaders,
      withCredentials: true,
    });
  }
}
