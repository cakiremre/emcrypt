import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsHomeComponent } from './components/settings-home/settings-home.component';
import { RouterModule, Routes } from '@angular/router';
import { EmailContentComponent } from './components/email-content/email-content.component';



const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: SettingsHomeComponent },
      { path: 'email', component: EmailContentComponent},
      { path: '**', redirectTo: '/company/overview', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule { }
