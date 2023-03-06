import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './components//accounts/accounts.component';
import { OptionsComponent } from './components//options/options.component';
import { CompanyComponent } from './components/company/company.component';
import { CompanyRoutingModule } from './company-routing.module';

@NgModule({
  declarations: [CompanyComponent, AccountsComponent, OptionsComponent],
  imports: [CommonModule, CompanyRoutingModule],
})
export class CompanyModule {}
