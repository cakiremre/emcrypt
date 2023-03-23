import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { HasSubscription, Language } from "src/app/common/models/model";
import { User } from "../../model/user";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-user-manual",
  templateUrl: "./user-manual.component.html",
  styleUrls: ["./user-manual.component.scss"],
})
export class UserManualComponent
  extends HasSubscription
  implements OnInit, OnDestroy
{
  user: User;
  languages = Object.values(Language);

  userForm = new FormGroup({
    email: new FormControl<string | null>("", Validators.required),
    profile: new FormGroup({
      firstName: new FormControl<string | null>("", Validators.required),
      lastName: new FormControl<string | null>("", Validators.required),
      prefer: new FormControl<Language | null>(
        Language.TR,
        Validators.required
      ),
    }),
  });

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params["id"];
    if (id === "new") {
      this.user = new User();
    } else {
      let subs = this.userService.get(id).subscribe((u) => {
        if (u == undefined) {
          // navigate back
        } else {
          this.user = u;
          this.userForm.patchValue(this.user);
        }
      });
      this.unsubscribe.push(subs);
    }
  }

  save(stay: boolean) {
    this.isSaving$.next(true);
    let user = { ...this.user, ...this.userForm.value } as User;
    let actionObs: Observable<User | undefined>;
    if (user.id) {
      actionObs = this.userService.update(user);
    } else {
      actionObs = this.userService.create(user);
    }

    let subs = actionObs.subscribe((data) => {
      if (stay) {
        this.user = new User();
        this.userForm.markAsPristine();
        this.userForm.markAsUntouched();
      } else {
        this.router.navigateByUrl("/company/users");
      }

      this.isSaving$.next(false);
    });
    this.unsubscribe.push(subs);
  }

  ngOnDestroy(): void {
    super.onDestroy();
  }

  public get email(): FormControl {
    return this.userForm.controls.email;
  }

  public get firstName(): FormControl {
    return this.userForm.controls.profile.controls.firstName;
  }

  public get lastName(): FormControl {
    return this.userForm.controls.profile.controls.lastName;
  }

  public get prefer(): FormControl {
    return this.userForm.controls.profile.controls.prefer;
  }
}
