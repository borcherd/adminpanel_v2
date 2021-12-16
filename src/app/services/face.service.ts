import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FaceRectangle } from '../models/faceRectangle';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class FaceService {

  private url = 'http://localhost/';
  //private url = 'https://api.accretion.be/';
  private basicHeaders = new HttpHeaders({});

  private groupId = '8b2a72ad-25db-4d63-b5d3-e0ad9dde9543';
  private maxNumOfCandidatesReturned = 1;

  constructor(private httpClient: HttpClient) { }

  //todo: deze doorlopen
  /**
   * creates a new largepersongroup
   * @param person the person of the group
   * @param headers null
   * @returns largepersongroup 
   */
  createLargePersonGroupPerson(person: Person, headers: HttpHeaders = null): Observable<any> {
    let usingHeaders = this.basicHeaders;

    if (headers !=  null) {
      usingHeaders = headers;
    }

    return this.httpClient.post<any>(this.url + 'api/v1/facerecognition/largepersongroups/' + this.groupId + '/persons',
      { name: person.firstName + ' ' + person.lastName }
      , {
        headers: usingHeaders,
        withCredentials: true
      });
  }

  /**
   * detect a new face
   * @param file the file to use for face detection
   * @param headers 
   * @returns 
   */
  detectFace(file: any, headers: HttpHeaders = null): Observable<any> {
    let usingHeaders = this.basicHeaders;

    if (headers !=  null) {
      usingHeaders = headers;
    }
    return this.httpClient.post<any>(this.url + 'api/v1/facerecognition/detect', file
      , {
        headers: usingHeaders,
        withCredentials: true
      });
  }

  /**
   * train new face
   * @returns largepersongroup
   */
  trainFace(): Observable<any> {
    return this.httpClient.post<any>(this.url + 'api/v1/facerecognition/largepersongroups/' + this.groupId +
      '/training', {}, {
      headers: this.basicHeaders,
      withCredentials: true

    });
  }

  /**
   * add na new face to a largepersongroup
   * @param personFaceId of id of the persons face
   * @param files to add to the largepersongroup
   * @param faceRectangle ...
   * @param headers null
   * @returns 
   */
  addFace(personFaceId: string, files: any, faceRectangle: FaceRectangle, headers: HttpHeaders = null):
    Observable<any> {
    let usingHeaders = this.basicHeaders;

    if (headers !=  null) {
      usingHeaders = headers;
    }
    return this.httpClient.post<any>(this.url + 'api/v1/facerecognition/largepersongroups/' + this.groupId +
      '/persons/' + personFaceId + '/persistedfaces?width=' + faceRectangle.width + '&height=' + faceRectangle.height +
      '&left=' + faceRectangle.left + '&top=' + faceRectangle.top, files, {
        headers: usingHeaders,
        withCredentials: true
    });
  }

  /**
   * recognize the person with their faceid
   * @param personFaceIds the persons faceid
   * @returns the identification
   */
  recognize(personFaceIds: string[]): Observable<any> {
    return this.httpClient.post<any>(this.url + 'api/v1/facerecognition/identify',
      { largePersonGroupId: this.groupId, faceIds: [personFaceIds],
        maxNumOfCandidatesReturned: this.maxNumOfCandidatesReturned,
        confidenceThreshold: 0.65}, {
        headers: this.basicHeaders,
        withCredentials: true

      });
  }
}
