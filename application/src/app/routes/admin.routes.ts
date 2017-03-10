import { LoginComponent } from '../components/login/login.component';
import { LogoutComponent } from '../components/login/login.component';
import { AuthGuard } from '../services/auth-guard.service';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { MlbComponent } from '../components/admin/mlb/mlb.component';
import { MlbPlayerComponent } from '../components/admin/mlb/mlb.component';
import { MembersComponent } from '../components/admin/members/members.component';
import { AddMemberComponent } from '../components/admin/members/members.component';
import { AddCmsComponent } from '../components/admin/cms/cms.component';
import { EditCmsComponent } from '../components/admin/cms/cms.component';
import { CmsComponent } from '../components/admin/cms/cms.component';

export const AdminRoutes = [
{ path: '', component: LoginComponent,data:{title:"Admin Login"} },
{ path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard],data:{title:"Dashboard"}},
{ path: 'mlb', component: MlbComponent,canActivate: [AuthGuard],data:{title:"MLB Players"}},
{ path: 'mlbplayers', component: MlbPlayerComponent,canActivate: [AuthGuard],data:{title:"MLB Players"}},
{ path: 'members', component: MembersComponent,canActivate: [AuthGuard],data:{title:"Members"}},
{ path: 'addmember', component: AddMemberComponent,canActivate: [AuthGuard],data:{title:"Add Member"}},
{ path: 'addpage', component: AddCmsComponent,canActivate: [AuthGuard],data:{title:"Add Page"}},
{ path: 'editpage/:id', component: EditCmsComponent,canActivate: [AuthGuard],data:{title:"Edit Page"}},
{ path: 'pages', component: CmsComponent,canActivate: [AuthGuard],data:{title:"Pages"}},
{ path: 'logout', component: LogoutComponent }
];