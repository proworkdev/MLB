//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule , Routes} from '@angular/router';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {DataTableModule,SharedModule} from 'primeng/primeng';
//Routes
import { AdminRoutes } from './routes/admin.routes';
//Components
import { TestComponent } from './components/login.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MlbComponent } from './components/admin/mlb/mlb.component';
import { MlbPlayerComponent } from './components/admin/mlb/mlb.component';

//Services
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';


// Layouts
import { LeftSidebar} from './layouts/admin/left-sidebar/left-sidebar.component';
import { Topbar} from './layouts/admin/left-sidebar/left-sidebar.component';

@NgModule({
  declarations: [
  TestComponent,
  LoginComponent,
  DashboardComponent,
  LeftSidebar,
  Topbar,
  LogoutComponent,
  MlbComponent,
  MlbPlayerComponent
  ],
  imports: [
  BrowserModule,
  FormsModule,
  HttpModule,
  RouterModule.forRoot(AdminRoutes),
  SimpleNotificationsModule.forRoot(),
  DataTableModule,
  SharedModule
  ],
  providers: [AuthService,AuthGuard],
  bootstrap: [TestComponent]
})
export class AppModule { }