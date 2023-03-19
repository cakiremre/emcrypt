import { Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
import { GenericDataResponse } from "src/app/common/models/model";
import { BaseService } from "src/app/common/services/base-service";
import { Email } from "../model/email";
import { SentApi } from "./api/sent-api.service";

@Injectable({
  providedIn: "root",
})
export class SentService extends BaseService<Email> {
  instantiate(): Email {
    return new Email();
  }
  constructor(private sentApi: SentApi) {
    super(sentApi);
  }

  revoke(
    messageId: string,
    address: string
  ): Observable<GenericDataResponse<Email> | undefined> {
    return this.sentApi.revoke(messageId, address).pipe(
      map((res: GenericDataResponse<Email>) => {
        let item = new Email();
        if (res.code == 0) {
          item.init(res.data);
        }
        let response = new GenericDataResponse<Email>();
        response.code = res.code;
        response.message = res.message;
        response.data = item;
        return response;
      }),
      catchError((err) => {
        console.error("err", err);
        return of(undefined);
      })
    );
  }
}
