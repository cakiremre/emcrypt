import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingsHomeComponent } from './modules/settings/components/settings-home/settings-home.component';
import { TenantEditComponent } from './modules/tenant/components/tenant-edit/tenant-edit.component';
import { TenantListComponent } from './modules/tenant/components/tenant-list/tenant-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'companies',
        component: TenantListComponent,
      },
      {
        path: 'companies/:id',
        component: TenantEditComponent,
      },
      {
        path: 'settings',
        component: SettingsHomeComponent,
      },
      { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: '/admin/dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
