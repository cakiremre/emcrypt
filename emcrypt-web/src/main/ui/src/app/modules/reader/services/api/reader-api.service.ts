import { Injectable } from "@angular/core";
import { Observable, ObservableLike } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { GenericDataResponse } from "src/app/common/models/model";
import { Decrypted } from "../../model/decrypted";
import { Options } from "../../model/options";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: "root",
})
export class ReaderApi {
  readonly path: string = "/box/email";

  constructor(private http: HttpClient) {}

  // public methods
  readDecrypted(
    messageId: string,
    tenant: string,
    address: string
  ): Observable<GenericDataResponse<Decrypted>> {
    return this.http.get<GenericDataResponse<Decrypted>>(
      `${API_URL}${this.path}/decrypt-read`,
      {
        headers: { "X-TENANT": tenant },
        params: { messageId: messageId, tenant: tenant, address: address },
      }
    );
  }

  readAttachment(
    messageId: string,
    tenant: string,
    attachmentId: string,
    address: string
  ): Observable<Blob> {
    return this.http.get<Blob>(`${API_URL}${this.path}/decrypt-attachment`, {
      headers: { "X-TENANT": tenant },
      responseType: "blob" as "json",
      params: {
        messageId: messageId,
        tenant: tenant,
        attachmentId: attachmentId,
        address: address,
      },
    });
  }

  options(
    messageId: string,
    tenant: string
  ): Observable<GenericDataResponse<Options>> {
    return this.http.get<GenericDataResponse<Options>>(
      `${API_URL}${this.path}/options`,
      {
        headers: { "X-TENANT": tenant },
        params: { messageId: messageId, tenant: tenant },
      }
    );
  }
}
