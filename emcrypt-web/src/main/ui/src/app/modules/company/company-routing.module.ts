import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './components/accounts/accounts.component';
import { CompanyComponent } from './components/company/company.component';
import { OptionsComponent } from './components/options/options.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'overview',
        component: CompanyComponent,
      },
      {
        path: 'accounts',
        component: AccountsComponent,
      },
      {
        path: 'settings',
        component: OptionsComponent,
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
