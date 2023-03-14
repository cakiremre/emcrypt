import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsHomeComponent } from './components/settings-home/settings-home.component';
import { RouterModule } from '@angular/router';
import { SettingsRoutingModule } from './settings-routing.module';
import { EmailContentComponent } from './components/email-content/email-content.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SettingsHomeComponent,
    EmailContentComponent
  ],
  imports: [
    CommonModule, RouterModule, SettingsRoutingModule, ReactiveFormsModule
  ]
})
export class SettingsModule { }
