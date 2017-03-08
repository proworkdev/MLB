import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

interface Credentials {
	email: string,
	password: string
}

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	credentials: Credentials;
	constructor(private authService : AuthService,private router : Router) { }

	ngOnInit() {
	}

	onSignIn(form: NgForm){
		this.authService.login(form).
		subscribe(
			success =>  this.router.navigate(['/admin/dashboard']),
			error => console.log(error)
			);
	}

}

@Component({
	selector: 'app-logout',
	templateUrl: './login.component.html'
})
export class LogoutComponent implements OnInit {
	constructor(private authService : AuthService,private router : Router) { 
	}

	ngOnInit() {
		this.authService.logout();
		this.router.navigate(['/admin']);

	}

}