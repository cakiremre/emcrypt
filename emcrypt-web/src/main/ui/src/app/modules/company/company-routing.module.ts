import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './components/company/company.component';
import { UserListComponent } from './modules/users/components/user-list/user-list.component';
import { UserManualComponent } from './modules/users/components/user-manual/user-manual.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'overview',
        component: CompanyComponent,
      },
      {
        path: 'users',
        component: UserListComponent,
      },
      {
        path: 'users/:id',
        component: UserManualComponent,
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./modules/settings/settings.module').then((m) => m.SettingsModule),
      },
      { path: '', redirectTo: '/company/overview', pathMatch: 'full' },
      { path: '**', redirectTo: '/company/overview', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
