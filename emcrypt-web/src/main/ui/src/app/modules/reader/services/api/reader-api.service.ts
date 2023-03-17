import { Injectable } from "@angular/core";
import { Observable, ObservableLike } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { GenericDataResponse } from "src/app/common/models/model";
import { Decrypted } from "../../model/decrypted";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: "root",
})
export class ReaderApi {
  readonly path: string = "/inb/email";

  constructor(private http: HttpClient) {}

  // public methods
  readDecrypted(
    messageId: string,
    tenant: string
  ): Observable<GenericDataResponse<Decrypted>> {
    return this.http.get<GenericDataResponse<Decrypted>>(
      `${API_URL}${this.path}/decrypt-read`,
      {
        headers: { "X-TENANT": tenant },
        params: { messageId: messageId, tenant: tenant },
      }
    );
  }

  readAttachment(
    messageId: string,
    tenant: string,
    attachmentId: string
  ): Observable<Blob> {
    return this.http.get<Blob>(`${API_URL}${this.path}/decrypt-attachment`, {
      headers: { "X-TENANT": tenant },
      responseType: "blob" as "json",
      params: {
        messageId: messageId,
        tenant: tenant,
        attachmentId: attachmentId,
      },
    });
  }
}
