import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReaderComponent } from "./components/reader/reader.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { RouterModule, Routes } from "@angular/router";
import { ReaderRouting } from "./reader-routes";
import { InlineSVGModule } from "ng-inline-svg-2";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: ReaderRouting,
  },
];

@NgModule({
  declarations: [ReaderComponent, LayoutComponent],
  imports: [CommonModule, RouterModule.forChild(routes), InlineSVGModule],
  exports: [RouterModule],
})
export class ReaderModule {}
