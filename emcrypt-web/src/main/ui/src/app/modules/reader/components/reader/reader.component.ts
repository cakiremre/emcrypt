import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HasSubscription } from "src/app/common/models/model";
import { Decrypted } from "../../model/decrypted";
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
  constructor(
    private readerService: ReaderService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    let messageId = this.activatedRoute.snapshot.queryParams["messageid"];
    let tenant = this.activatedRoute.snapshot.queryParams["tenant"];

    let subs = this.readerService
      .readDecrypted(messageId, tenant)
      .subscribe((response) => {
        if (response != undefined) {
          this.decrypted = response;
        }
      });
    this.unsubscribe.push(subs);
  }

  ngOnDestroy(): void {
    super.onDestroy();
  }
}
