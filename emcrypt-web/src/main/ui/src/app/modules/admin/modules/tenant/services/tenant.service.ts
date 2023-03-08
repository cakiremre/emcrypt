import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TenantApi } from './api/tenant-api.service';
import { HasSubscription } from 'src/app/common/models/model';
import { catchError, map, Observable, of } from 'rxjs';
import { Tenant } from '../model/tenant';
import { BaseService } from 'src/app/common/services/base-service';

@Injectable({
  providedIn: 'root',
})
export class TenantService extends BaseService<Tenant> {
  instantiate(): Tenant {
    return new Tenant();
  }
  constructor(tenantApi: TenantApi) {
    super(tenantApi);
  }
}
