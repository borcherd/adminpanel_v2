import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url = 'http://localhost/';
  //private url = 'https://api.accretion.be/';
  private basicHeaders = new HttpHeaders({});

  constructor(private httpClient: HttpClient) { }

  //todo: contracten ff nalopen met kobe

  /**
   * function to authenticate the current session
   * @returns the loginurl
   */
  authenticate(): Observable<string> {

    return this.httpClient.get<string>(this.url + 'login');
  }

  /**
   * checks if the invitationtoken is valid
   * @param invitationToken to invoke a authenticationToken
   * @returns the authenticationToken
   */
  isInvitationValid(invitationToken: string): Observable<any> {
    const header = new HttpHeaders({'Authorization': invitationToken});
    return this.httpClient.get<any>(this.url + 'token', {headers : header});
  }

  /**
   * check if the currents user token is valid
   * @returns token
   */
  isLoggedIn(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'token/loggedin', {
      headers : this.basicHeaders,
      withCredentials: true,
    });
  }

  /**
   * logs out the current user
   * @returns logout 
   */
  logout(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'logout', {
      headers : this.basicHeaders,
      withCredentials: true,
    });
  }
}
