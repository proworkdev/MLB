import { Component, OnInit } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'left-sidebar',
	templateUrl: './left-sidebar.component.html'
})
export class LeftSidebar implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}

@Component({
	moduleId: module.id,
	selector: 'topbar',
	templateUrl: './topbar.html'
})
export class Topbar implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
