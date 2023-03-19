import { Injectable, OnDestroy } from "@angular/core";
import {
  Base,
  GenericDataResponse,
  HasSubscription,
} from "src/app/common/models/model";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { ReaderApi } from "./api/reader-api.service";
import { Decrypted } from "../model/decrypted";
import { Options } from "../model/options";

@Injectable({
  providedIn: "root",
})
export abstract class ReaderService
  extends HasSubscription
  implements OnDestroy
{
  constructor(private readerApi: ReaderApi) {
    super();
  }

  readDecrypted(
    messageId: string,
    tenant: string,
    address: string
  ): Observable<GenericDataResponse<Decrypted> | undefined> {
    return this.readerApi.readDecrypted(messageId, tenant, address).pipe(
      map((res: GenericDataResponse<Decrypted>) => {
        let item = new Decrypted();
        if (res.code == 0) {
          item.init(res.data);
        }
        let response = new GenericDataResponse<Decrypted>();
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

  downloadAttachment(
    messageId: string,
    tenant: string,
    attachmentId: string,
    address: string
  ): any {
    return this.readerApi
      .readAttachment(messageId, tenant, attachmentId, address)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((err) => {
          console.error("err", err);
          return of(undefined);
        })
      );
  }

  options(messageId: string, tenant: string): Observable<Options | undefined> {
    return this.readerApi.options(messageId, tenant).pipe(
      map((res: GenericDataResponse<Options>) => {
        if (res.code == 0) {
          let item = new Options();
          item.init(res.data);
          return item;
        } else {
          throwError(() => {
            console.log("err", res.code);
          });
        }
      }),
      catchError((err) => {
        console.error("err", err);
        return of(undefined);
      })
    );
  }

  ngOnDestroy(): void {
    super.onDestroy();
  }
}
