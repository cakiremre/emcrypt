import { Routes } from '@angular/router';
import { RedirComponent } from '../modules/auth/components/redir/redir.component';
import { AuthGuard } from '../modules/auth/services/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanyComponent } from './company/company.component';

const Routing: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'company',
    component: CompanyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: RedirComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
