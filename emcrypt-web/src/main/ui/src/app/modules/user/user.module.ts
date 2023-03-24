import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SentComponent } from "./components/sent/sent.component";
import { UserRoutingModule } from "./user-routing.module";
import { InlineSVGModule } from "ng-inline-svg-2";
import { LayoutModule } from "src/app/_metronic/layout";
import { CommonsModule } from "src/app/common/commons.module";

@NgModule({
  declarations: [SentComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    InlineSVGModule,
    LayoutModule,
    CommonsModule,
  ],
})
export class UserModule {}
