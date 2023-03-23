import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PagerComponent } from "./components/pager/pager.component";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [PagerComponent],
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  exports: [PagerComponent],
})
export class CommonsModule {}
