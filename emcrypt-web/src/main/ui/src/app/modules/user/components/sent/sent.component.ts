import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  GenericDataResponse,
  HasSubscription,
  Pager,
} from "src/app/common/models/model";
import { Email } from "../../model/email";
import { SentService } from "../../services/sent.service";
import * as moment from "moment";
import { Recipient } from "src/app/modules/reader/model/decrypted";

@Component({
  selector: "app-sent",
  templateUrl: "./sent.component.html",
  styleUrls: ["./sent.component.scss"],
})
export class SentComponent
  extends HasSubscription
  implements OnInit, OnDestroy
{
  sentList: Array<Email> = new Array();
  dateFormat = "DD.MM.yyyy HH:mm";
  selected: Email;
  pager = new Pager(0, 10);

  constructor(private sentService: SentService) {
    super();
  }

  pageChanged(pager: Pager) {
    this.pager = pager;
  }

  ngOnInit(): void {
    let subs = this.sentService.list().subscribe((data) => {
      this.sentList = data;
    });
    this.unsubscribe.push(subs);
  }

  revoke(sent: Email, recipient: Recipient) {
    recipient.revoked = true;
    let subs = this.sentService
      .revoke(sent.id, recipient.address)
      .subscribe((response: GenericDataResponse<Email> | undefined) => {
        if (response != undefined && response.code == 0) {
          sent.init(response.data);
        }
      });
    this.unsubscribe.push(subs);
  }

  select(sent: Email) {
    this.selected = sent;
  }

  getEmcryption(sent: Email) {
    let emcryption = "";
    let options = sent.options;
    if (options.emcrypt) {
      emcryption += "E";
    }
    if (options.delay) {
      emcryption += "D";
    }
    if (options.expire) {
      emcryption += "X";
    }
    if (options.forward) {
      // true means disable forwarding
      emcryption += "F";
    }
    return emcryption;
  }

  getEmcryptionTitle(sent: Email) {
    let title = "";
    let options = sent.options;
    if (options.emcrypt) {
      title += "Encryption applied. \n";
    }
    if (options.delay) {
      title +=
        "Access delayed at: " +
        moment(options.delayAt).format(this.dateFormat) +
        ". \n";
    }
    if (options.expire) {
      title +=
        "Email will expire at: " +
        moment(options.expireAt).format(this.dateFormat) +
        ". \n";
    }
    if (options.forward) {
      // true means disable forwarding
      title += "Forwarding disabled. \n";
    }
    return title;
  }

  ngOnDestroy(): void {
    super.onDestroy();
  }
}
