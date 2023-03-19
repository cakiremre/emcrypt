import { Component, OnInit, OnDestroy } from "@angular/core";
import { HasSubscription } from "src/app/common/models/model";
import { Email } from "../../model/email";
import { SentService } from "../../services/sent.service";

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

  constructor(private sentService: SentService) {
    super();
  }
  ngOnInit(): void {
    let subs = this.sentService.list().subscribe((data) => {
      this.sentList = data;
    });
    this.unsubscribe.push(subs);
  }

  revoke(sent: Email) {
    let recipient = sent.to[0];
    recipient.revoked = true;
    let subs = this.sentService.update(sent).subscribe((data) => {
      console.log(data);
    });
    this.unsubscribe.push(subs);
  }

  ngOnDestroy(): void {
    super.onDestroy();
  }
}
