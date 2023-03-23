import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HasSubscription } from "src/app/common/models/model";
import { Ldap } from "../../model/endpoint";
import { EndpointService } from "../../services/endpoint.service";

@Component({
  selector: "app-ldap",
  templateUrl: "./ldap.component.html",
  styleUrls: ["./ldap.component.scss"],
})
export class LdapComponent
  extends HasSubscription
  implements OnInit, OnDestroy
{
  ldap: Ldap;
  configForm = new FormGroup({
    url: new FormControl<string | null>("", Validators.required),
    basedn: new FormControl<string | null>("", Validators.required),
    trust: new FormControl<boolean>(false),
    userdn: new FormControl<string | null>("", Validators.required),
    userCategory: new FormControl<string | null>("", Validators.required),
    firstNameAttr: new FormControl<string | null>("", Validators.required),
    lastNameAttr: new FormControl<string | null>("", Validators.required),
    emailAttr: new FormControl<string | null>("", Validators.required),
    languageAttr: new FormControl<string | null>("", Validators.required),
    password: new FormControl<string | null>("", Validators.required),
  });

  constructor(private endpointService: EndpointService) {
    super();
  }

  ngOnInit(): void {
    this.endpointService.ldap().subscribe((ldap) => {
      if (ldap != undefined) {
        this.ldap = ldap;
        this.configForm.patchValue(this.ldap);
      } else {
        this.ldap = new Ldap();
      }
    });
  }

  editPassword() {
    this.ldap.encrypted = false;
    this.ldap.password = "";
    this.configForm.patchValue(this.ldap);
  }

  save() {
    let subs;
    let ldap = { ...this.ldap, ...this.configForm.value } as Ldap;
    if (!this.ldap.id) {
      subs = this.endpointService.createLdap(ldap);
    } else {
      subs = this.endpointService.updateLdap(ldap);
    }
    this.unsubscribe.push(
      subs.subscribe((res) => {
        if (res != undefined) {
          this.ldap = res;
          this.configForm.patchValue(this.ldap);
        } else {
          // error
        }
      })
    );
  }

  delete() {
    this.unsubscribe.push(
      this.endpointService.deleteLdap().subscribe((res) => {
        this.ldap = new Ldap();
        this.configForm.reset();
        this.configForm.patchValue(this.ldap);
      })
    );
  }

  test() {
    let ldap = { ...this.ldap, ...this.configForm.value } as Ldap;

    let subs = this.endpointService
      .testLdap(ldap)
      .subscribe((res) => console.log(res));

    this.unsubscribe.push(subs);
  }

  ngOnDestroy(): void {
    super.onDestroy();
  }

  public get url(): FormControl {
    return this.configForm.controls.url;
  }

  public get basedn(): FormControl {
    return this.configForm.controls.basedn;
  }

  public get userdn(): FormControl {
    return this.configForm.controls.userdn;
  }

  public get userCategory(): FormControl {
    return this.configForm.controls.userCategory;
  }

  public get firstNameAttr(): FormControl {
    return this.configForm.controls.firstNameAttr;
  }

  public get lastNameAttr(): FormControl {
    return this.configForm.controls.lastNameAttr;
  }

  public get emailAttr(): FormControl {
    return this.configForm.controls.emailAttr;
  }

  public get languageAttr(): FormControl {
    return this.configForm.controls.languageAttr;
  }

  public get password(): FormControl {
    return this.configForm.controls.password;
  }
}
