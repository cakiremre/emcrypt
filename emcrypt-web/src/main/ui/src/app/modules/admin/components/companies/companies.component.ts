import { Component, OnDestroy, OnInit } from '@angular/core';
import { HasSubscription } from 'src/app/common/models/model';
import { Tenant } from '../../models/model';
import { TenantService } from '../../services/tenant.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent
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
      console.log('tenants', this.tenants);
    });

    this.unsubscribe.push(subs);
  }
  ngOnDestroy(): void {
    super.onDestroy();
  }
}
