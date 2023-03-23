import { Component, OnDestroy, OnInit } from "@angular/core";
import { HasSubscription, Pager } from "src/app/common/models/model";
import { User } from "../../model/user";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent
  extends HasSubscription
  implements OnInit, OnDestroy
{
  users: User[] = [];
  pager = new Pager(0, 10);

  constructor(private userService: UserService) {
    super();
  }

  pageChanged(pager: Pager) {
    this.pager = pager;
  }

  ngOnInit(): void {
    let subs = this.userService.list().subscribe((data) => {
      this.users = data;
    });

    this.unsubscribe.push(subs);
  }

  ngOnDestroy(): void {
    super.onDestroy();
  }
}
