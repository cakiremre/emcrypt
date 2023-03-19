import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SentComponent } from "./components/sent/sent.component";
import { UserRoutingModule } from "./user-routing.module";
import { InlineSVGModule } from "ng-inline-svg-2";
import { LayoutModule } from "src/app/_metronic/layout";

@NgModule({
  declarations: [SentComponent],
  imports: [CommonModule, UserRoutingModule, InlineSVGModule, LayoutModule],
})
export class UserModule {}
