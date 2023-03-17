import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HasSubscription } from "src/app/common/models/model";
import { Attachment, Decrypted } from "../../model/decrypted";
import { ReaderService } from "../../services/reader.service";

@Component({
  selector: "app-reader",
  templateUrl: "./reader.component.html",
  styleUrls: ["./reader.component.scss"],
})
export class ReaderComponent
  extends HasSubscription
  implements OnInit, OnDestroy
{
  decrypted: Decrypted = new Decrypted();
  messageId: string;
  tenant: string;

  constructor(
    private readerService: ReaderService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.messageId = this.activatedRoute.snapshot.queryParams["messageid"];
    this.tenant = this.activatedRoute.snapshot.queryParams["tenant"];

    let subs = this.readerService
      .readDecrypted(this.messageId, this.tenant)
      .subscribe((response) => {
        if (response != undefined) {
          this.decrypted = response;
        }
      });
    this.unsubscribe.push(subs);
  }

  download(attachment: Attachment) {
    let subs = this.readerService
      .downloadAttachment(this.messageId, this.tenant, attachment.id)
      .subscribe((data: any) => {
        let downloadURL = window.URL.createObjectURL(data);
        let link = document.createElement("a");
        link.href = downloadURL;
        link.download = attachment.name;
        link.click();
      });
    this.unsubscribe.push(subs);
  }

  ngOnDestroy(): void {
    super.onDestroy();
  }
}
