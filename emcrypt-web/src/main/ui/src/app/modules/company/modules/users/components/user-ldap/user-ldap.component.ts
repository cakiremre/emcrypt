import { Component, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HasSubscription, Pager } from "src/app/common/models/model";
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
  users: Array<User> = new Array();
  pager: Pager;

  constructor(private userService: UserService) {
    super();
  }

  pageChanged(pager: Pager) {
    this.pager = pager;
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
