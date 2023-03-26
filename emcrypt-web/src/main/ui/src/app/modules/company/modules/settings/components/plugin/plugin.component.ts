import { Component, OnInit } from "@angular/core";
import { Account, AuthService } from "src/app/modules/auth";

@Component({
  selector: "app-plugin",
  templateUrl: "./plugin.component.html",
  styleUrls: ["./plugin.component.scss"],
})
export class PluginComponent implements OnInit {
  tenant = "";
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    let account = this.authService.currentUserValue as Account;
    console.log(account);
    if (account) {
      this.tenant = account.tenant;
    }
  }
}
