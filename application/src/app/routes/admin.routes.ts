import { TestComponent } from '../components/login.component';
import { LoginComponent } from '../components/login/login.component';
import { LogoutComponent } from '../components/login/login.component';
import { AuthGuard } from '../services/auth-guard.service';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { MlbComponent } from '../components/admin/mlb/mlb.component';
import { MlbPlayerComponent } from '../components/admin/mlb/mlb.component';

export const AdminRoutes = [
{ path: 'test', component: TestComponent },
{ path: 'mlbadmin', component: LoginComponent },
{ path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]},
{ path: 'mlb', component: MlbComponent,canActivate: [AuthGuard]},
{ path: 'mlbplayers', component: MlbPlayerComponent,canActivate: [AuthGuard]},
{ path: 'logout', component: LogoutComponent }
];
