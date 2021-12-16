import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Package } from '../models/package';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'http://localhost/';
  //private url = 'https://api.accretion.be/';
  private basicHeaders = new HttpHeaders({})

  constructor(private httpClient: HttpClient) { }

  getAllPackages(): Observable<Package[]> {
    return this.httpClient.get<Package[]>(this.url + 'api/v1/packages', {
      headers: this.basicHeaders,
      withCredentials: true,
    });
  }
}
