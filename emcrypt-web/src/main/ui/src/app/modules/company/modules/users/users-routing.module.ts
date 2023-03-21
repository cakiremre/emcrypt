import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserCsvComponent } from "./components/user-csv/user-csv.component";
import { UserLdapComponent } from "./components/user-ldap/user-ldap.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserManualComponent } from "./components/user-manual/user-manual.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: UserListComponent,
      },
      {
        path: "csv",
        component: UserCsvComponent,
      },
      {
        path: "ldap",
        component: UserLdapComponent,
      },
      {
        path: "users/:id",
        component: UserManualComponent,
      },
      { path: "**", redirectTo: "/company/overview", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
