import { Component } from '@angular/core';
import {LeftSidebar} from '../layouts/admin/left-sidebar/left-sidebar.component';
import {AuthService} from '../services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: '../app.component.html',
	styleUrls: ['../app.component.css']
})
export class TestComponent {
	admin = false

	constructor(private auth: AuthService) {	
		if(this.auth.loggedIn())
			this.admin = true	
	}

	ngDoCheck(){
		if(this.auth.loggedIn()){
			this.admin = true
		}else{
			this.admin = false
		}
	}
	
	
}