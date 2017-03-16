import { FrontComponent } from '../components/front/front.component';
import { UserService } from '../services/user.service';
import { UserdashboardComponent } from '../components/user/userdashboard/userdashboard.component';


export const FrontRoutes = [
{ path: '', component: FrontComponent,data:{title:"Homepage"} },
{ path: 'dashboard', component: UserdashboardComponent,canActivate: [UserService],data:{title:"Dashboard"} }
];