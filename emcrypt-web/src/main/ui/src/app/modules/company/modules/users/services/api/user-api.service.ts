import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';
import { BaseApi } from 'src/app/common/services/base-api';
import { User } from '../../model/user';

const API_TENANT_URL = `${environment.apiUrl}/adm/user`;

@Injectable({
  providedIn: 'root',
})
export class UserApi extends BaseApi<User> {
  path: string = '/adm/user';

  constructor(http: HttpClient) {
    super(http);
  }
}
