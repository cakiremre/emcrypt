import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SentComponent } from "./components/sent/sent.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "sent",
        component: SentComponent,
      },
      { path: "", redirectTo: "/user/sent", pathMatch: "full" },
      { path: "**", redirectTo: "/user/sent", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
