import { Injectable } from '@angular/core';
import { Http , Headers, Response } from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import { tokenNotExpired } from 'angular2-jwt';


interface Credentials {
  email: string,
  password: string
}

@Injectable()
export class AuthService {

  constructor(private http:Http) {}

  login(Credentials){
    return this.http.post('http://localhost:8080/api/authenticate',
      {email:Credentials.value.email,password:Credentials.value.password},
      {headers:new Headers({'X-Requested-with':'XMLHttpRequest'})})
    .map(
      (response : Response) =>{
        const token  = response.json().token;
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-','+').replace('_','/');
        localStorage.setItem('token',token);
        // return JSON.parse(window.atob(base64));
      }
      ).do(
      tokenData =>{

      }
      )
    }

    loggedIn() {
      return  localStorage.getItem('token');
    }

  /*login(credentials) {
    this.http.post('https://my-app.com/api/authenticate', credentials)
    .map(res => res.json())
    .subscribe(
      // We're assuming the response will be an object
      // with the JWT on an id_token key
      data => localStorage.setItem('id_token', data.id_token),
      error => console.log(error)
      );
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout() {
    localStorage.removeItem('id_token'); 
  }*/
}