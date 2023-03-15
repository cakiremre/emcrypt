import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  enumFromStringValue,
  HasSubscription,
  Language,
} from "src/app/common/models/model";
import { Content } from "../../model/content";
import { ContentService } from "../../services/content.service";

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

  language: Language;
  html: string;

  @ViewChild("templateForm") templateForm!: NgForm;

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

    // default language set edilebilir burada
    if (Object.keys(this.selected.html).length > 0) {
      let lang = Object.keys(this.selected.html)[0];
      this.language = enumFromStringValue(Language, lang) as Language;
      this.html = this.selected.html[this.language];
    } else {
      this.language = Language.TR;
      this.html = "";
    }
  }

  languageChanged() {
    let html = this.selected.html[this.language];
    if (html) {
      this.html = html;
    } else {
      this.html = "";
    }
  }

  setContentForLanguage() {
    if (this.html.length > 0) {
      this.selected.html[this.language] = this.html;
    }
  }

  save(): void {
    if (this.language && this.html) {
      this.selected.html[this.language] = this.html;
      this.contentService
        .update(this.selected)
        .subscribe((data) => console.log(data));
    }
  }

  ngOnDestroy(): void {
    super.onDestroy();
  }
}
