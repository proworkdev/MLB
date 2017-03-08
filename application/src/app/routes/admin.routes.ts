import { LoginComponent } from '../components/login/login.component';
import { LogoutComponent } from '../components/login/login.component';
import { AuthGuard } from '../services/auth-guard.service';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { MlbComponent } from '../components/admin/mlb/mlb.component';
import { MlbPlayerComponent } from '../components/admin/mlb/mlb.component';
import { MembersComponent } from '../components/admin/members/members.component';
import { AddMemberComponent } from '../components/admin/members/members.component';

export const AdminRoutes = [
{ path: '', component: LoginComponent,data:{title:"Admin Login"} },
{ path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard],data:{title:"Dashboard"}},
{ path: 'mlb', component: MlbComponent,canActivate: [AuthGuard],data:{title:"MLB Players"}},
{ path: 'mlbplayers', component: MlbPlayerComponent,canActivate: [AuthGuard],data:{title:"MLB Players"}},
{ path: 'members', component: MembersComponent,canActivate: [AuthGuard],data:{title:"Members"}},
{ path: 'addmember', component: AddMemberComponent,canActivate: [AuthGuard],data:{title:"Add Member"}},
{ path: 'logout', component: LogoutComponent }
];