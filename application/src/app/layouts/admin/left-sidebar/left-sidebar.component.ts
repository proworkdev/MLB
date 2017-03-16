import { Component, OnInit,ElementRef  } from '@angular/core';
declare var jQuery: any;

@Component({
	moduleId: module.id,
	selector: 'left-sidebar',
	templateUrl: './left-sidebar.component.html'
})
export class LeftSidebar implements OnInit {

	constructor(private element : ElementRef) { 

	}

	ngOnInit() {
		jQuery('.sidebar .accordion-menu li .sub-menu').slideUp(0);
		//jQuery(".accordion-menu .droplink > a").click(() => this.collapseMenu());
		jQuery(this.element.nativeElement).find('.accordion-menu .droplink > a').on('click', (e) => {
			console.log(e)
			jQuery(e).addClass('hello')
		});
	}

	collapseMenu(){
		//console.log(jQuery(this).addClass('hello'));
		jQuery(this).addClass('hello')
		
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

@Component({
	moduleId: module.id,
	selector: 'admin-head',
	templateUrl: './admin-head.html'
})
export class AdminHead implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
