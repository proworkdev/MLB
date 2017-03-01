import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule , Routes} from '@angular/router';
import { AdminRoutes } from './routes/admin.routes';
import { TestComponent } from './components/login.component';
import { LoginFormComponent } from './components/login-form.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
  TestComponent,
  LoginFormComponent,
  LoginComponent,
  DashboardComponent
  ],
  imports: [
  BrowserModule,
  FormsModule,
  HttpModule,
  RouterModule.forRoot(AdminRoutes)
  ],
  providers: [AuthService,AuthGuard],
  bootstrap: [TestComponent]
})
export class AppModule { }