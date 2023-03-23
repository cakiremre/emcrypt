import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HasSubscription } from "src/app/common/models/model";
import { Smtp } from "../../model/endpoint";
import { EndpointService } from "../../services/endpoint.service";

@Component({
  selector: "app-smtp",
  templateUrl: "./smtp.component.html",
  styleUrls: ["./smtp.component.scss"],
})
export class SmtpComponent
  extends HasSubscription
  implements OnInit, OnDestroy
{
  smtp: Smtp;
  configForm = new FormGroup({
    host: new FormControl<string | null>("", Validators.required),
    port: new FormControl<number>(25, Validators.required),
    ssl: new FormControl<boolean>(false),
    auth: new FormControl<boolean>(false),
    username: new FormControl<string | null>("", Validators.required),
    password: new FormControl<string | null>("", Validators.required),
  });

  constructor(private endpointService: EndpointService) {
    super();
  }

  ngOnInit(): void {
    this.endpointService.smtp().subscribe((smtp) => {
      if (smtp != undefined) {
        this.smtp = smtp;
        this.configForm.patchValue(this.smtp);
      } else {
        this.smtp = new Smtp();
      }
    });
  }

  editPassword() {
    this.smtp.encrypted = false;
    this.smtp.password = "";
    this.configForm.patchValue(this.smtp);
  }

  save() {
    let subs;
    let smtp = { ...this.smtp, ...this.configForm.value } as Smtp;
    if (!this.smtp.id) {
      subs = this.endpointService.createSmtp(smtp);
    } else {
      subs = this.endpointService.updateSmtp(smtp);
    }
    this.unsubscribe.push(
      subs.subscribe((res) => {
        if (res != undefined) {
          this.smtp = res;
          this.configForm.patchValue(this.smtp);
        } else {
          // error
        }
      })
    );
  }

  delete() {
    this.unsubscribe.push(
      this.endpointService.deleteSmtp().subscribe((res) => {
        this.smtp = new Smtp();
        this.configForm.reset();
        this.configForm.patchValue(this.smtp);
      })
    );
  }

  ngOnDestroy(): void {
    super.onDestroy();
  }

  public get host(): FormControl {
    return this.configForm.controls.host;
  }

  public get port(): FormControl {
    return this.configForm.controls.port;
  }

  public get ssl(): FormControl {
    return this.configForm.controls.ssl;
  }

  public get auth(): FormControl {
    return this.configForm.controls.auth;
  }

  public get username(): FormControl {
    return this.configForm.controls.username;
  }

  public get password(): FormControl {
    return this.configForm.controls.password;
  }
}
