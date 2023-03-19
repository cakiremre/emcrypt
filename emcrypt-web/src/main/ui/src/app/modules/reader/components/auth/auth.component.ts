import { Component } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { first, Observable, Subscription } from "rxjs";
import { GenericResponse } from "src/app/common/models/model";
import { AuthService } from "src/app/modules/auth";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent {
  readerAuthForm: FormGroup;
  isLoading$: Observable<boolean>;
  hasError: boolean;

  phase: string = "otp";
  params: Params;

  code: FormControl = new FormControl<string>(
    "",
    Validators.compose([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ])
  );

  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isLoading$ = this.authService.isLoading$;
    console.log(this.route.snapshot.queryParams);
    this.params = this.route.snapshot.queryParams;

    // redirect if logged in ?
    if (this.authService.currentUserValue) {
      // FIXME redirect
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.readerAuthForm.controls;
  }

  initForm() {
    this.readerAuthForm = this.fb.group({
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
    });
  }

  submit() {
    this.hasError = false;
    if (this.phase == "otp") {
      const otpSubscribe = this.authService
        .otpReader(this.f.email.value)
        .pipe(first())
        .subscribe((response: GenericResponse) => {
          if (response.code == 0) {
            // move to next phase
            this.phase = "code";
            this.readerAuthForm.addControl("code", this.code);
          } else {
            this.hasError = true;
          }
        });
      this.unsubscribe.push(otpSubscribe);
    } else if (this.phase == "code") {
      const codeSubscribe = this.authService
        .otpLogin(this.f.email.value, this.f.code.value)
        .pipe(first())
        .subscribe((response) => {
          if (response != undefined) {
            this.router.navigate(["/secure-read"], {
              queryParams: this.params,
            });
          }
        });
      this.unsubscribe.push(codeSubscribe);
    } else {
      // do nothing
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
