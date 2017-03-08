import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
//import {Member} from '../../../forms/member';
import {NotificationsService} from 'angular2-notifications';

interface Member {
	email: string,
	first_name: string,
	last_name: string,
	password: string
}

@Component({
	selector: 'app-members',
	templateUrl: './members.component.html',
	styleUrls: ['../../../../../node_modules/primeng/resources/themes/omega/theme.css','../../../../../node_modules/primeng/resources/primeng.min.css','../../../../../node_modules/primeng/components/datatable/datatable.css']
})
export class MembersComponent implements OnInit {

	allmembers = [];
	newMember : boolean;
	//member: Member = new MemberInterface();
	displayDialog: boolean;
	selectedCar;
	constructor(private memberService : AuthService, private notificationService : NotificationsService) { }

	ngOnInit() {
		this.memberService.getMembers().subscribe(
			members => {
				for(var i = 0;i<members.length;i++){
					members[i].local.id = members[i]._id;
					this.allmembers.push(members[i].local);
				}
			} ,
			error => console.log(error)
			)
	}


	onRowSelect(event) {
		this.newMember = false;
		this.editMember = event.data;
		this.displayDialog = true;
		this.selectedCar = event.data;
	}

	editMember(c: Member){}

	delete(id){
		this.memberService.deleteMember(id).subscribe(
			success => console.log('a'),
			error => console.log(error)
			)
		this.allmembers.splice(this.findSelectedMemberIndex(), 1);
		this.displayDialog = false;
		this.notificationService.success(
			'Success',
			'Delete User Successfully',
			{
				timeOut: 5000,
				showProgressBar: true,
				pauseOnHover: false,
				clickToClose: false
			}
			)
	}

	findSelectedMemberIndex(): number {
		return this.allmembers.indexOf(this.selectedCar);
	}

	edit(member){
		this.memberService.editMember(member).subscribe(
			success => console.log('success'),
			error => console.log(error)
			)	
	}


}





@Component({
	selector: 'app-members',
	templateUrl: './add.component.html',
	styleUrls: ['./members.component.css']
})
export class AddMemberComponent implements OnInit {

	constructor(private memberService : AuthService,private router : Router) { }

	ngOnInit() {

	}

	onMemberAdd(form: NgForm){
		this.memberService.saveMember(form.value).subscribe(
			success => console.log('a'),
			error => console.log(error)
			)
	}

}
