import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantListComponent } from './components/tenant-list/tenant-list.component';
import { TenantEditComponent } from './components/tenant-edit/tenant-edit.component';
import { TenantConfigureComponent } from './components/tenant-configure/tenant-configure.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TenantListComponent,
    TenantEditComponent,
    TenantConfigureComponent,
  ],
  imports: [CommonModule, InlineSVGModule, RouterModule, ReactiveFormsModule],
})
export class TenantModule {}
