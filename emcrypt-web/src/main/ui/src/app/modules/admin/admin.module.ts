import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesComponent } from './components/companies/companies.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [CompaniesComponent, SettingsComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
