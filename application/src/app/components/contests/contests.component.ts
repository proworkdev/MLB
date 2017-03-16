import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
@Component({
	selector: 'app-contests',
	templateUrl: './contests.component.html',
	styleUrls: ['./contests.component.css']
})
export class ContestsComponent implements OnInit {

	contests:Object
	constructor(private authService: AuthService) { }

	ngOnInit() {
		this.authService.getcontests().subscribe(
			getContests =>{
				this.contests = getContests.data
			}
			)
	}
}