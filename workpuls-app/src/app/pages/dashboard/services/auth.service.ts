import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getUser = (): Observable<User> => {
    return of({
      name: 'Dejan',
      lastName: 'Mitrovic',
    });
  };
}
