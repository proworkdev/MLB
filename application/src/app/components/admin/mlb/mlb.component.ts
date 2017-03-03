import { Component, OnInit , ViewEncapsulation  } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
	selector: 'app-mlb',
	templateUrl: './mlb.component.html',
	styleUrls: ['../../../../../node_modules/primeng/resources/themes/omega/theme.css','../../../../../node_modules/primeng/resources/primeng.min.css','../../../../../node_modules/primeng/components/datatable/datatable.css'],
	encapsulation: ViewEncapsulation.None
})
export class MlbComponent implements OnInit {
	private mlbTeams: Object;
	players = []
	cols: any[];
	constructor(private mlbService: AuthService) {
		
	}

	ngOnInit() {
		this.mlbService.getMlbTeams().
		subscribe(
			teams => {
				this.mlbTeams = teams; 
			} ,
			error => console.log(error)
			);
		this.cols = [
		{field: 'name', header: 'Name'},
		{field: 'market', header: 'Market'},
		{field: 'abbr', header: 'Abbr'}
		];
		
	}
}


@Component({
	selector: 'app-mlb-player',
	templateUrl: './players.component.html',
	styleUrls: ['../../../../../node_modules/primeng/resources/themes/omega/theme.css','../../../../../node_modules/primeng/resources/primeng.min.css','../../../../../node_modules/primeng/components/datatable/datatable.css'],
	encapsulation: ViewEncapsulation.None
})
export class MlbPlayerComponent implements OnInit {
	
	private mlbTeams: Object;
	players = []
	cols: any[];
	constructor(private mlbService: AuthService) {
		
	}

	ngOnInit() {
		this.mlbService.getMlbPlayers().
		subscribe(
			teams => {
				for(var i =0; i < teams.length; i++){
					
				}
				this.mlbTeams = teams[0].players; 
			} ,
			error => console.log(error)
			);
		this.cols = [
		{field: 'full_name', header: 'Name'},
		{field: 'preferred_name', header: 'Preffered Name'},
		{field: 'jersey_number', header: 'Jercey Number'}
		];
		
	}}