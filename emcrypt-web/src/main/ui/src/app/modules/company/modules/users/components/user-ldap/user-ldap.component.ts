import { Component, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HasSubscription } from "src/app/common/models/model";
import { User } from "../../model/user";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-user-ldap",
  templateUrl: "./user-ldap.component.html",
  styleUrls: ["./user-ldap.component.scss"],
})
export class UserLdapComponent
  extends HasSubscription
  implements OnInit, OnDestroy
{
  isSaving$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isSaving: boolean;

  users: Array<User> = new Array();
  constructor(private userService: UserService) {
    super();
  }

  loadUsersFromLdap() {
    let subs = this.userService.ldapAll().subscribe((users) => {
      if (users != undefined) {
        this.users = users;
      } else {
        // do something
      }
    });
  }

  save() {}

  ngOnInit(): void {
    // nothing here
  }
  ngOnDestroy(): void {
    super.onDestroy();
  }
}
