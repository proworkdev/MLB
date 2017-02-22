import { TestComponent } from '../components/login.component';
import { LoginFormComponent } from '../components/login-form.component'
import { AuthGuard } from '../services/auth-guard.service';

export const AdminRoutes = [
{ path: 'test', component: TestComponent },
{ path: 'admin', component: LoginFormComponent },
{ path: 'dashboard', component: TestComponent,canActivate: [AuthGuard] }
];