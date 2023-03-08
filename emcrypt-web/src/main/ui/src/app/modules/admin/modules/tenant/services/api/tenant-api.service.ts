import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';
import { Tenant } from '../../model/tenant';
import { BaseApi } from 'src/app/common/services/base-api';

const API_TENANT_URL = `${environment.apiUrl}/adm/tenant`;

@Injectable({
  providedIn: 'root',
})
export class TenantApi extends BaseApi<Tenant> {
  path: string = '/adm/tenant';

  constructor(http: HttpClient) {
    super(http);
  }
}
