import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../../../environments/environment";
import { API_URL, BaseApi } from "src/app/common/services/base-api";
import { User } from "../../model/user";
import { BatchSaveOut, GenericDataResponse } from "src/app/common/models/model";

const API_TENANT_URL = `${environment.apiUrl}/adm/user`;

@Injectable({
  providedIn: "root",
})
export class UserApi extends BaseApi<User> {
  path: string = "/adm/user";

  constructor(http: HttpClient) {
    super(http);
  }

  saveAll(users: Array<User>): Observable<GenericDataResponse<BatchSaveOut>> {
    return this.http.post<GenericDataResponse<BatchSaveOut>>(
      `${API_URL}${this.path}/save-all`,
      users
    );
  }

  ldapAll(): Observable<GenericDataResponse<Array<User>>> {
    return this.http.get<GenericDataResponse<Array<User>>>(
      `${API_URL}${this.path}/ldap-all`
    );
  }
}
