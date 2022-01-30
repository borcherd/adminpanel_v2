import { Injectable } from '@angular/core';
import {Person, Role} from '../models/person';


@Injectable()
export class RoleAuthorisationService {
  public isAuthorised(role: Role): boolean {
    const currentUser = localStorage.getItem('role');
    if (!currentUser) return false;
    return role === currentUser;
  }
}
