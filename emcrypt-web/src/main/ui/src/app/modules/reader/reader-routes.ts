import { Routes, RouterModule } from "@angular/router";
import { ReaderComponent } from "./components/reader/reader.component";

const ReaderRouting: Routes = [
  {
    path: "",
    component: ReaderComponent,
  },
  { path: "**", redirectTo: "error/404" },
];

export { ReaderRouting };
