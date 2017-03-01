import { TestComponent } from '../components/login.component';
import { LoginComponent } from '../components/login/login.component';
import { AuthGuard } from '../services/auth-guard.service';
import { DashboardComponent } from '../components/dashboard/dashboard.component';

export const AdminRoutes = [
{ path: 'test', component: TestComponent },
{ path: 'mlbadmin', component: LoginComponent },
{ path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]}
];