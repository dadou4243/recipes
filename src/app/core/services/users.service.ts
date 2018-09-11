import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class UsersService {

  private currentUserSubject = new BehaviorSubject<any>({});
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  constructor(private http: HttpClient) {
  }

  getCurrentUser() {
    this.http.get<any>(`${environment.API_URL}/users/current`).subscribe(
      user => {
        console.log(user);
        this.currentUserSubject.next(user);
      },
    err => console.log(err)
    );
  }
}

