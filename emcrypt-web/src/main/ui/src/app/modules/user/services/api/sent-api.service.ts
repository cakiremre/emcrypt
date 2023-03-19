import { Injectable } from "@angular/core";
import { Observable, ObservableLike } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { API_URL, BaseApi } from "src/app/common/services/base-api";
import { Email } from "../../model/email";
import { environment } from "src/environments/environment";
import { GenericDataResponse } from "src/app/common/models/model";

const API_TENANT_URL = `${environment.apiUrl}/inb/sent`;

@Injectable({
  providedIn: "root",
})
export class SentApi extends BaseApi<Email> {
  path: string = "/inb/sent";

  constructor(http: HttpClient) {
    super(http);
  }

  revoke(
    messageId: string,
    address: string
  ): Observable<GenericDataResponse<Email>> {
    return this.http.post<GenericDataResponse<Email>>(
      `${API_URL}${this.path}/revoke`,
      {},
      {
        params: { messageId: messageId, address: address },
      }
    );
  }
}
