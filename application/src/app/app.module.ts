//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule , Routes} from '@angular/router';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {DataTableModule,SharedModule ,DialogModule} from 'primeng/primeng';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

//Routes
import { AppRoutes } from './routes/app.routes';

//Components
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MlbComponent } from './components/admin/mlb/mlb.component';
import { MlbPlayerComponent } from './components/admin/mlb/mlb.component';
import { MembersComponent } from './components/admin/members/members.component';
import { AddMemberComponent } from './components/admin/members/members.component';
import { CmsComponent } from './components/admin/cms/cms.component';
import { AddCmsComponent } from './components/admin/cms/cms.component';
import { EditCmsComponent } from './components/admin/cms/cms.component';


import { TestComponent } from './components/login.component';

//Services
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { UserService } from './services/user.service';

// Admin Layouts
import { LeftSidebar} from './layouts/admin/left-sidebar/left-sidebar.component';
import { Topbar} from './layouts/admin/left-sidebar/left-sidebar.component';
import { AdminHead } from './layouts/admin/left-sidebar/left-sidebar.component';


//FrontEnd Components
import { FrontComponent } from './components/front/front.component';
import { ContestsComponent } from './components/contests/contests.component';
import { UserdashboardComponent } from './components/user/userdashboard/userdashboard.component';


//FrontEnd Layouts
import { UserlayoutComponent } from './layouts/userlayout/userlayout.component';

@NgModule({
  declarations: [
  TestComponent,
  LoginComponent,
  DashboardComponent,
  LeftSidebar,
  Topbar,
  AdminHead,
  LogoutComponent,
  MlbComponent,
  MlbPlayerComponent,
  FrontComponent,
  MembersComponent,
  AddMemberComponent,
  CmsComponent,
  AddCmsComponent,
  EditCmsComponent,
  ContestsComponent,
  UserdashboardComponent,
  UserlayoutComponent
  ],
  imports: [
  BrowserModule,
  FormsModule,
  HttpModule,
  RouterModule.forRoot(AppRoutes),
  SimpleNotificationsModule.forRoot(),
  DataTableModule,
  SharedModule,
  DialogModule,
  ModalModule.forRoot(),
  BootstrapModalModule
  ],
  providers: [AuthService,AuthGuard,UserService],
  bootstrap: [TestComponent]
})
export class AppModule {
  constructor(){

  }}
