import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CompanyComponent } from "./components/company/company.component";
import { CompanyRoutingModule } from "./company-routing.module";
import { InlineSVGModule } from "ng-inline-svg-2";
import { UsersModule } from "./modules/users/users.module";
import { SettingsModule } from "./modules/settings/settings.module";

@NgModule({
  declarations: [CompanyComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    InlineSVGModule,
    UsersModule,
    SettingsModule,
  ],
})
export class CompanyModule {}
