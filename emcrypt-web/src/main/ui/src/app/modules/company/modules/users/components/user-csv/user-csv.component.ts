import { Component, OnInit, OnDestroy } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {
  enumFromStringValue,
  HasSubscription,
  Language,
  Pager,
} from "src/app/common/models/model";
import { User } from "../../model/user";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-user-csv",
  templateUrl: "./user-csv.component.html",
  styleUrls: ["./user-csv.component.scss"],
})
export class UserCsvComponent
  extends HasSubscription
  implements OnInit, OnDestroy
{
  users: Array<User> = new Array();
  pager: Pager = new Pager(0, 10);

  constructor(private userService: UserService) {
    super();
  }

  ngOnInit(): void {
    // empty
  }

  pageChanged(pager: Pager) {
    this.pager = pager;
  }

  onCsvSelect(csvInput: HTMLInputElement) {
    if (csvInput.files != null && csvInput.files.length > 0) {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        let lines = fileReader.result
          ?.toString()
          .split(/[\n\r]/)
          .filter((l) => l);
        lines?.forEach((line) => {
          let parts = line.split(/[,;]/);
          let user = new User();
          user.profile.firstName = parts[0];
          user.profile.lastName = parts[1];
          user.email = parts[2];

          let lang = enumFromStringValue(Language, parts[3]);
          if (lang != undefined) user.profile.prefer = lang;
          this.users.push(user);
        });
      };
      fileReader.readAsText(csvInput.files[0]);
    }
  }

  save() {
    this.isSaving$.next(true);
    let subs = this.userService.saveAll(this.users).subscribe((out) => {
      console.log(out);
    });
    this.unsubscribe.push(subs);
  }

  ngOnDestroy(): void {
    super.onDestroy();
  }
}
