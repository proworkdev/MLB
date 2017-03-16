import { Component , OnInit } from '@angular/core';
import {LeftSidebar} from '../layouts/admin/left-sidebar/left-sidebar.component';
import {AuthService} from '../services/auth.service';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
declare var jQuery: any;

@Component({
	moduleId: module.id,
	selector: 'app-root',
	templateUrl: '../app.component.html',
	styleUrls: ['../app.component.css']
})
export class TestComponent implements OnInit{
	admin = false
	title= "Admin"
	user = false

	constructor(private auth: AuthService,private titleService: Title,private activatedRoute: ActivatedRoute,private router: Router
		) {	
		if(this.auth.loggedIn())
			this.admin = true	
		this.titleService.setTitle('My awesome app');
	}

	ngDoCheck(){
		if(this.auth.loggedIn()){
			this.admin = true
			jQuery(".sidebar .accordion-menu .sub-menu li.droplink > a").click(() => this.collapseMenu());
		}else if(this.auth.userLoggedIn()){
			this.user = true
		}else{
			this.user = false;
			this.admin = false;
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

	collapseMenu(){
		
		
	}

	sidebarAndContentHeight() {
		var content = jQuery('.page-inner'),
		sidebar = jQuery('.page-sidebar'),
		body = jQuery('body'),
		height,
		footerHeight = jQuery('.page-footer').outerHeight(),
		pageContentHeight = jQuery('.page-content').height();

		content.attr('style', 'min-height:' + sidebar.height() + 'px !important');

		if (body.hasClass('page-sidebar-fixed')) {
			height = sidebar.height() + footerHeight;
		} else {
			height = sidebar.height() + footerHeight;
			if (height  < jQuery(window).height()) {
				height = jQuery(window).height();
			}
		}

		if (height >= content.height()) {
			content.attr('style', 'min-height:' + height + 'px !important');
		}
	}
}