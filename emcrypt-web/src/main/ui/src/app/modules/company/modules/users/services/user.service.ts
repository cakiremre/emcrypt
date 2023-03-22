import { Injectable, OnDestroy } from "@angular/core";
import {
  BatchSave,
  BatchSaveOut,
  GenericDataResponse,
} from "src/app/common/models/model";
import { BaseService } from "src/app/common/services/base-service";
import { User } from "../model/user";
import { Observable, of, catchError, map } from "rxjs";
import { UserApi } from "./api/user-api.service";

@Injectable({
  providedIn: "root",
})
export class UserService extends BaseService<User> {
  instantiate(): User {
    return new User();
  }
  constructor(private userApi: UserApi) {
    super(userApi);
  }

  saveAll(users: Array<User>): Observable<BatchSaveOut | undefined> {
    return this.userApi.saveAll(users).pipe(
      map((res: GenericDataResponse<BatchSaveOut>) => {
        let ret = new BatchSaveOut();
        ret.init(res.data);
        return ret;
      }),
      catchError((err) => {
        console.log("err", err);
        return of(undefined);
      })
    );
  }
}
