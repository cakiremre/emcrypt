import { Injectable, OnDestroy } from "@angular/core";
import {
  Base,
  GenericDataResponse,
  HasSubscription,
} from "src/app/common/models/model";
import { catchError, map, Observable, of } from "rxjs";
import { ReaderApi } from "./api/reader-api.service";
import { Decrypted } from "../model/decrypted";

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
    tenant: string
  ): Observable<Decrypted | undefined> {
    return this.readerApi.readDecrypted(messageId, tenant).pipe(
      map((res: GenericDataResponse<Decrypted>) => {
        if (res.code == 0) {
          let item = new Decrypted();
          item.init(res.data);
          return item;
        } else {
          console.error("err", res.code);
          return undefined;
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
