import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  private loggedInSubject = new BehaviorSubject<Boolean>(false);
  public loggedIn = this.loggedInSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<Boolean>(false);
  public currentUser = this.currentUserSubject.asObservable();

  API_URL = 'http://localhost:4600/api';

  constructor(private http: HttpClient) {
  }

  logIn(logInForm) {
    console.log(logInForm);
    return this.http.post<any>(this.API_URL + '/auth/login', logInForm);
  }

  signUp(signUpForm) {
    console.log(signUpForm.value);
    return this.http.post<any>(this.API_URL + '/auth', signUpForm.value);
  }

  setLoggedInValue(value) {
    this.loggedInSubject.next(value);
  }
}
