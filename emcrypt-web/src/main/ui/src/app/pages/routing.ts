import { Routes } from "@angular/router";
import { RedirComponent } from "../modules/auth/components/redir/redir.component";
import { AuthGuard } from "../modules/auth/services/auth.guard";

const Routing: Routes = [
  {
    path: "admin",
    loadChildren: () =>
      import("../modules/admin/admin.module").then((m) => m.AdminModule),
    canActivate: [AuthGuard],
  },
  {
    path: "company",
    loadChildren: () =>
      import("../modules/company/company.module").then((m) => m.CompanyModule),
    canActivate: [AuthGuard],
  },
  {
    path: "user",
    loadChildren: () =>
      import("../modules/user/user.module").then((m) => m.UserModule),
    canActivate: [AuthGuard],
  },
  {
    path: "",
    component: RedirComponent,
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "error/404",
  },
];

export { Routing };
