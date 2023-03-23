import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsHomeComponent } from "./components/settings-home/settings-home.component";
import { RouterModule, Routes } from "@angular/router";
import { EmailContentComponent } from "./components/email-content/email-content.component";
import { SmtpComponent } from "./components/smtp/smtp.component";
import { LdapComponent } from "./components/ldap/ldap.component";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "", component: SettingsHomeComponent },
      { path: "email", component: EmailContentComponent },
      { path: "smtp", component: SmtpComponent },
      { path: "ldap", component: LdapComponent },

      { path: "**", redirectTo: "/company/overview", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
