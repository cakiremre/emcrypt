import { Injectable, OnDestroy } from '@angular/core';
import { BaseService } from 'src/app/common/services/base-service';
import { User } from '../model/user';
import { UserApi } from './api/user-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<User> {
  instantiate(): User {
    return new User();
  }
  constructor(userApi: UserApi) {
    super(userApi);
  }
}
