import { Component , OnInit } from '@angular/core';
import {LeftSidebar} from '../layouts/admin/left-sidebar/left-sidebar.component';
import {AuthService} from '../services/auth.service';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: '../app.component.html',
	styleUrls: ['../app.component.css']
})
export class TestComponent implements OnInit{
	admin = false
	title= "Admin"

	constructor(private auth: AuthService,private titleService: Title,private activatedRoute: ActivatedRoute,private router: Router
		) {	
		if(this.auth.loggedIn())
			this.admin = true	
		this.titleService.setTitle('My awesome app');
	}

	ngDoCheck(){
		if(this.auth.loggedIn()){
			this.admin = true
		}else{
			this.admin = false
		}
	}

	ngOnInit(){
		this.router.events
		.filter(event => event instanceof NavigationEnd)
		.map(() => this.activatedRoute)
		.map(route => {
			while (route.firstChild) route = route.firstChild;
			return route;
		})
		.filter(route => route.outlet === 'primary')
		.mergeMap(route => route.data)
		.subscribe((event) => this.titleService.setTitle(event['title']));
	}	
}