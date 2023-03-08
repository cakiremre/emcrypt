import { Component, OnDestroy, OnInit } from '@angular/core';
import { HasSubscription } from 'src/app/common/models/model';
import { Tenant } from '../../model/tenant';
import { TenantService } from '../../services/tenant.service';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.scss'],
})
export class TenantListComponent
  extends HasSubscription
  implements OnInit, OnDestroy
{
  tenants: Tenant[] = [];
  constructor(private tenantService: TenantService) {
    super();
  }

  ngOnInit(): void {
    let subs = this.tenantService.list().subscribe((data) => {
      this.tenants = data;
    });

    this.unsubscribe.push(subs);
  }

  ngOnDestroy(): void {
    super.onDestroy();
  }
}
