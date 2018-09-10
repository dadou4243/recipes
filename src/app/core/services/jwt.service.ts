import { Injectable } from '@angular/core';

import * as jwt_decode from 'jwt-decode';


@Injectable()
export class JwtService {

  constructor() { }

  getDecodedToken(token: string): any {
    try {
        return jwt_decode(token);
    } catch (Error) {
        return null;
    }
  }

  getToken() {
    return window.localStorage.getItem('RecipesToken');
  }

  checkIfTokenExpired(token) {
    const now = new Date().getTime() / 1000;
    console.log(now > token.exp);
    return now > token.exp;
  }

  saveToken(token: string) {
    window.localStorage.setItem('RecipesToken', token);
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }

}
