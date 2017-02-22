import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

interface Credentials {
  email: string,
  password: string
}

@Component({
  moduleId: module.id,
  selector: 'login-form',
  templateUrl: '../pages/admin/login-form.component.html'
})
export class LoginFormComponent {

  credentials: Credentials;
  title = 'Admin Login';
  data='a';

  onSubmit() {console.log(this.data)}
  /*constructor(private auth: AuthService) {}*/

/*  onLogin(credentials) {
    this.auth.login(credentials);
  }*/

  // TODO: Remove this when we're done
  /*  get diagnostic() { return JSON.stringify(this.model); }*/
}