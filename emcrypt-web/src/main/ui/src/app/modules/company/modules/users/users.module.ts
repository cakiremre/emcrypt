import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserListComponent } from "./components/user-list/user-list.component";
import { InlineSVGModule } from "ng-inline-svg-2";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { UserManualComponent } from "./components/user-manual/user-manual.component";
import { UserCsvComponent } from "./components/user-csv/user-csv.component";
import { UserLdapComponent } from "./components/user-ldap/user-ldap.component";
import { UsersRoutingModule } from "./users-routing.module";

@NgModule({
  declarations: [
    UserListComponent,
    UserManualComponent,
    UserCsvComponent,
    UserLdapComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    InlineSVGModule,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class UsersModule {}
