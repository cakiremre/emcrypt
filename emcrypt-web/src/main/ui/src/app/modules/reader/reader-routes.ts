import { Routes, RouterModule } from "@angular/router";
import { components } from "src/app/_metronic/kt";
import { AuthGuard } from "../auth/services/auth.guard";
import { AuthComponent } from "./components/auth/auth.component";
import { ReaderComponent } from "./components/reader/reader.component";

const ReaderRouting: Routes = [
  {
    path: "",
    component: ReaderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "auth",
    component: AuthComponent,
  },
  { path: "**", redirectTo: "error/404" },
];

export { ReaderRouting };
