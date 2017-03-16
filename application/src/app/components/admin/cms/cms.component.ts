import { Component, OnInit , ViewContainerRef } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { NgForm } from '@angular/forms';
import {Pages} from '../../../forms/pages';
import {EditPage} from '../../../forms/pages';
import {AuthService} from '../../../services/auth.service'
import {NotificationsService} from 'angular2-notifications';
import {ActivatedRoute} from '@angular/router';
declare var jQuery: any;

@Component({
	selector: 'app-cms',
	templateUrl: './cms.component.html',
	styleUrls: ['./cms.component.css']
})
export class CmsComponent implements OnInit {
	model;
	private pages: Object;
	constructor(private cmsService : AuthService,private _notification : NotificationsService) {

		this.cmsService.getPages().subscribe(
			pages => {
				this.pages = pages;
			}
			)
	}

	ngOnInit() {
		this.model = new Pages('','','');
	}

	delete(pageid){
		console.log(pageid);
		var r = confirm("You Want to delete this page!!");
		if (r == true) {
			this.cmsService.deletePage(pageid).subscribe(
				success => {
					jQuery('#page-'+pageid).remove();
					this._notification.success(
						'Success',
						'Page Deleted Successfully',
						{
							timeOut: 5000,
							showProgressBar: true,
							pauseOnHover: false,
							clickToClose: false
						}
						)
				},
				error   =>console.log(error)
				)
		}
		
	}

}


@Component({
	selector: 'app-cms',
	templateUrl: './add.component.html',
	styleUrls: ['./cms.component.css']
})
export class AddCmsComponent implements OnInit {
	model;
	constructor(private service : AuthService,private notification : NotificationsService) { }

	ngOnInit() {
		this.model = new Pages('','','');
		jQuery('.summernotee').summernote();
		
	}

	onCmsAdd(form:NgForm){
		form.value.content = jQuery('.note-editable').html();
		this.service.addPage(form.value).subscribe(
			success => {
				this.notification.success(
					'Success',
					'Page Created Successfully',
					{
						timeOut: 5000,
						showProgressBar: true,
						pauseOnHover: false,
						clickToClose: false
					}
					)
			}
			);
	}

	addSlug()
	{
		this.model.slug =  this.model.title
		.toLowerCase()
		.replace(/[^\w ]+/g,'')
		.replace(/ +/g,'-')
		;
	}
}


@Component({
	selector: 'app-cms',
	templateUrl: './edit.component.html',
	styleUrls: ['./cms.component.css']
})
export class EditCmsComponent implements OnInit {
	model;
	pid;
	constructor(private service : AuthService,private notification : NotificationsService,private route: ActivatedRoute) { 
		
	}

	ngOnInit() {
		this.model = new EditPage('','','','');
		this.service.getPage(this.route.snapshot.params['id']).subscribe(
			page =>{
				this.model = new EditPage(page.title,page.slug,'',page._id);
				jQuery('.note-editable').html(page.content);
			}
			)
		jQuery('.summernotee').summernote();
		
	}

	onCmsEdit(form:NgForm){
		form.value.content = jQuery('.note-editable').html();
		this.service.addPage(form.value).subscribe(
			success => {
				this.notification.success(
					'Success',
					'Page Edited Successfully',
					{
						timeOut: 5000,
						showProgressBar: true,
						pauseOnHover: false,
						clickToClose: false
					}
					)
			}
			);
	}
}