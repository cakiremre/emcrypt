import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./components/login/login.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { AuthComponent } from "./auth.component";
import { TranslationModule } from "../i18n/translation.module";
import { ActivateComponent } from "./components/activate/activate.component";
import { RedirComponent } from "./components/redir/redir.component";

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    LogoutComponent,
    AuthComponent,
    ActivateComponent,
    RedirComponent,
  ],
  imports: [
    CommonModule,
    TranslationModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class AuthModule {}
