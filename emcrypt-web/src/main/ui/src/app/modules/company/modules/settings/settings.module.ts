import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsHomeComponent } from "./components/settings-home/settings-home.component";
import { RouterModule } from "@angular/router";
import { SettingsRoutingModule } from "./settings-routing.module";
import { EmailContentComponent } from "./components/email-content/email-content.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CKEditorModule } from "ckeditor4-angular";
import { LdapComponent } from "./components/ldap/ldap.component";
import { SmtpComponent } from "./components/smtp/smtp.component";

@NgModule({
  declarations: [
    SettingsHomeComponent,
    EmailContentComponent,
    LdapComponent,
    SmtpComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    CKEditorModule,
  ],
})
export class SettingsModule {}
