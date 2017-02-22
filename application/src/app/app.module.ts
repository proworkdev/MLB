import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule} from '@angular/router';
import { AdminRoutes } from './routes/admin.routes';
import { TestComponent } from './components/login.component';
import { LoginFormComponent } from './components/login-form.component';
import {enableProdMode} from '@angular/core';

enableProdMode();
@NgModule({
  declarations: [
  TestComponent,
  LoginFormComponent
  ],
  imports: [
  BrowserModule,
  FormsModule,
  HttpModule,
  RouterModule.forRoot(AdminRoutes)
  ],
  providers: [],
  bootstrap: [TestComponent]
})
export class AppModule { }