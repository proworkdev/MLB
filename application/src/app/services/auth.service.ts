import { Injectable } from '@angular/core';
import { Http , Headers, Response } from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import { tokenNotExpired } from 'angular2-jwt';
import {NotificationsService} from 'angular2-notifications';

interface Credentials {
  email: string,
  password: string
}

@Injectable()
export class AuthService {

  constructor(private http:Http,private _notificationsService: NotificationsService) {}

  login(Credentials){
    return this.http.post('http://localhost:8080/api/authenticate',
      {email:Credentials.value.email,password:Credentials.value.password},
      {headers:new Headers({'X-Requested-with':'XMLHttpRequest'})})
    .map(
      (response : Response) =>{
        if(response.json().success == false){
          this._notificationsService.error(
            'User Not Found',
            'Unauthorized User',
            {
              timeOut: 5000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: false
            }
            )
        }else{
          this._notificationsService.success(
            'Welcome to MLB',
            'Admin Panel',
            {
              timeOut: 5000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: false
            }
            )
          const token  = response.json().token;
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace('-','+').replace('_','/');
          localStorage.setItem('token',token);
          localStorage.setItem('user',JSON.stringify(response.json().user));
        }       
      }
      ).do(
      tokenData =>{

      }
      )
    }

    loggedIn() {
      var userDetail = JSON.parse(localStorage.getItem('user'));
      if(userDetail){
        if(userDetail.local.role == 'admin'){
          return  localStorage.getItem('token');
        }
      }
      
      
    }

    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this._notificationsService.success(
        'Successfully',
        'Logout',
        {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false
        }
        )
    }


    getMlbTeams(){
      return this.http.get('http://localhost:8080/api/mlbTeams',{headers:new Headers({'Authorization':localStorage.getItem('token')})}).map(
        (response : Response) => {
          return response.json();
        });
    }

    getMlbPlayers(){
      return this.http.get('http://localhost:8080/api/mlbPlayers',{headers:new Headers({'Authorization':localStorage.getItem('token')})}).map(
        (response : Response) => {
          return response.json();
        });
    }
  }