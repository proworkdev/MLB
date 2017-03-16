import { Component, OnInit } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'app-front',
	templateUrl: './front.component.html',
	styleUrls: ['./front.component.css']
})
export class FrontComponent implements OnInit {

	name = "s"
	constructor() { }

	ngOnInit() {
	}

}
