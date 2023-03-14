import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SettingItem } from '../../model/model';

@Component({
  selector: 'app-settings-home',
  templateUrl: './settings-home.component.html',
  styleUrls: ['./settings-home.component.scss']
})
export class SettingsHomeComponent {
  settings: SettingItem[] = [
    {
      name: "Email Content",
      description: "This email template is replaced with user emails on the client-side.",
      link: "/company/settings/email"
    }
  ]
  constructor(private router:Router){

  }

  navigateByUrl(url: string){
    this.router.navigateByUrl(url);
  }
}
