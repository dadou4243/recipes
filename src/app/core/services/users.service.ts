import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { JwtService } from './jwt.service';

@Injectable()
export class UsersService {

  private loggedInSubject = new BehaviorSubject<Boolean>(false);
  public loggedIn = this.loggedInSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<any>({});
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
  ) {
    this.getCurrentUser();
  }

  logIn(logInForm) {
    console.log(logInForm);
    return this.http.post<any>(`${environment.API_URL}/auth/login`, logInForm);
  }

  logOut() {
    this.jwtService.destroyToken();
    this.setLoggedInValue(false);
    this.getCurrentUser();
  }

  signUp(signUpForm) {
    console.log(signUpForm.value);
    return this.http.post<any>(`${environment.API_URL}/auth`, signUpForm.value);
  }

  setLoggedInValue(value) {
    this.loggedInSubject.next(value);
  }

  getCurrentUser() {
    this.currentUserSubject.next(this.jwtService.currentUser);
    // this.http.get<any>(`${environment.API_URL}/users/current`).subscribe(
    //   user => {
    //     this.currentUserSubject.next(user);
    //   },
    // err => console.log(err)
    // );
  }

  getCurrentUserDetail() {
    return this.http.get<any>(`${environment.API_URL}/users/current`);
  }

  getAllUsers() {
    return this.http.get<any>(`${environment.API_URL}/users`);
  }

  updateUser(recipeId, userDetails) {
    console.log(userDetails);
    return this.http.patch<any>(`${environment.API_URL}/users/${recipeId}`, userDetails);
  }
}

