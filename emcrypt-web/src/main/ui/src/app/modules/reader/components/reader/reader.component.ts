import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  GenericDataResponse,
  HasSubscription,
} from "src/app/common/models/model";
import { AuthService, Reader } from "src/app/modules/auth";
import { Attachment, Decrypted } from "../../model/decrypted";
import { Options } from "../../model/options";
import { ReaderService } from "../../services/reader.service";
import * as moment from "moment";
import { CdTimerComponent, TimeInterface } from "angular-cd-timer/public-api";

@Component({
  selector: "app-reader",
  templateUrl: "./reader.component.html",
  styleUrls: ["./reader.component.scss"],
})
export class ReaderComponent
  extends HasSubscription
  implements OnInit, OnDestroy
{
  response: GenericDataResponse<Decrypted>;
  decrypted: Decrypted = new Decrypted();
  messageId: string;
  tenant: string;
  reader: Reader;
  code: number = -100;

  options: Options;

  @ViewChild("delayTimer") delayTimer: CdTimerComponent;

  constructor(
    private readerService: ReaderService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.messageId = this.activatedRoute.snapshot.queryParams["messageid"];
    this.tenant = this.activatedRoute.snapshot.queryParams["tenant"];
    this.reader = <Reader>this.authService.currentUserValue;

    let subs = this.readerService
      .readDecrypted(this.messageId, this.tenant, this.reader.address)
      .subscribe((response) => {
        if (response != undefined) {
          this.code = response.code;
          switch (response.code) {
            case 0:
              this.decrypted = response.data;
              break;
            case 205:
              this.startTimer();
              break;
            default:
              break;
          }
        }
      });
    this.unsubscribe.push(subs);
  }

  download(attachment: Attachment) {
    let subs = this.readerService
      .downloadAttachment(
        this.messageId,
        this.tenant,
        attachment.id,
        this.reader.address
      )
      .subscribe((data: any) => {
        let downloadURL = window.URL.createObjectURL(data);
        let link = document.createElement("a");
        link.href = downloadURL;
        link.download = attachment.name;
        link.click();
      });
    this.unsubscribe.push(subs);
  }

  startTimer() {
    let subs = this.readerService
      .options(this.messageId, this.tenant)
      .subscribe((data) => {
        if (data != undefined) {
          this.options = data;

          let now = moment();
          let delayAt = moment(this.options.delayAt);

          let countdown = delayAt.diff(now, "seconds") as number;
          this.delayTimer.startTime = countdown;
          this.delayTimer.countdown = true;
          this.delayTimer.start();
        }
      });
    this.unsubscribe.push(subs);
  }

  ngOnDestroy(): void {
    super.onDestroy();
  }
}
