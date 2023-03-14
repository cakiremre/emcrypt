import { Component, OnInit, OnDestroy } from "@angular/core";
import { HasSubscription, Language } from "src/app/common/models/model";
import { Content } from "../../model/content";
import { ContentService } from "../../services/content.service";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SourceEditing from "@ckeditor/ckeditor5-source-editing/src/sourceediting";

@Component({
  selector: "app-email-content",
  templateUrl: "./email-content.component.html",
  styleUrls: ["./email-content.component.scss"],
})
export class EmailContentComponent
  extends HasSubscription
  implements OnInit, OnDestroy
{
  contents: Content[] = [];
  languages = Object.values(Language);
  selected: Content;
  editor = ClassicEditor;

  constructor(private contentService: ContentService) {
    super();
  }

  ngOnInit(): void {
    let contents = this.contentService.list().subscribe((data) => {
      this.contents = data;
      if (this.contents.length > 0) {
        this.select(this.contents[0]);
      }
    });
  }

  select(content: Content): void {
    this.contents.forEach((c) => (c.selected = false));
    content.selected = true;
    this.selected = content;
  }

  ngOnDestroy(): void {
    super.onDestroy();
  }
}
