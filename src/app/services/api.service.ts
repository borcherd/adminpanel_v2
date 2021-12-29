import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Package } from '../models/package';
import { basicHeaders, url } from './constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  /**
   * gets all packages from the database
   * @returns an array of packages
   */
  getAllPackages(): Observable<Package[]> {
    return this.httpClient.get<Package[]>(url + 'api/v1/packages', {
      headers: basicHeaders,
      withCredentials: true,
    });
  }
}
