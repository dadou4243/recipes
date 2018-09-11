import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class UsersService {

  private loggedInSubject = new BehaviorSubject<Boolean>(false);
  public loggedIn = this.loggedInSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<any>({});
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  constructor(private http: HttpClient) {
  }

  logIn(logInForm) {
    console.log(logInForm);
    return this.http.post<any>(`${environment.API_URL}/auth/login`, logInForm);
  }

  signUp(signUpForm) {
    console.log(signUpForm.value);
    return this.http.post<any>(`${environment.API_URL}/auth`, signUpForm.value);
  }

  setLoggedInValue(value) {
    this.loggedInSubject.next(value);
  }

  getCurrentUser() {
    this.http.get<any>(`${environment.API_URL}/users/current`).subscribe(
      user => {
        this.currentUserSubject.next(user);
      },
    err => console.log(err)
    );
  }
}

