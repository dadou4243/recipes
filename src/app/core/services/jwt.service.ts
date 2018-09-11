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
    return window.localStorage.getItem('Recipes_Token_Id');
  }

  checkIfTokenExpired() {
    const now = new Date().getTime() / 1000;
    const exp = parseInt(window.localStorage.getItem('Recipes_Token_Exp'), 10);
    return now > exp;
  }

  saveToken(token: string) {
    const decodedToken = this.getDecodedToken(token);
    console.log(decodedToken);
    window.localStorage.setItem('Recipes_Token_Id', token);
    window.localStorage.setItem('Recipes_Token_Exp', decodedToken.exp);
  }

  destroyToken() {
    window.localStorage.removeItem('Recipes_Token_Id');
    window.localStorage.removeItem('Recipes_Token_Exp');
  }

}
