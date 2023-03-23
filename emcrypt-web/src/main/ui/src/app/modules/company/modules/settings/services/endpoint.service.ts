import { Injectable, OnDestroy } from "@angular/core";
import {
  Base,
  compare,
  Direction,
  GenericResponse,
  HasSubscription,
} from "src/app/common/models/model";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { EndpointApi } from "./api/endpoint-api.service";
import { Ldap, Smtp } from "../model/endpoint";

@Injectable({
  providedIn: "root",
})
export class EndpointService extends HasSubscription implements OnDestroy {
  constructor(protected endpointApi: EndpointApi) {
    super();
  }

  smtp(): Observable<Smtp | undefined> {
    return this.endpointApi.smtp().pipe(
      map((res) => {
        if (res) {
          let item = new Smtp();
          item.init(res);
          return res;
        } else {
          return undefined;
        }
      }),
      catchError((err) => {
        console.log("err", err);
        return of(undefined);
      })
    );
  }

  createSmtp(smtp: Smtp): Observable<Smtp | undefined> {
    return this.endpointApi.createSmtp(smtp).pipe(
      map((res) => {
        let item = new Smtp();
        item.init(res);
        return res;
      }),
      catchError((err) => {
        console.log("err", err);
        return of(undefined);
      })
    );
  }

  updateSmtp(smtp: Smtp): Observable<Smtp | undefined> {
    return this.endpointApi.updateSmtp(smtp).pipe(
      map((res) => {
        let item = new Smtp();
        item.init(res);
        return res;
      }),
      catchError((err) => {
        console.log("err", err);
        return of(undefined);
      })
    );
  }

  deleteSmtp(): Observable<any> {
    return this.endpointApi.deleteSmtp().pipe(
      catchError((err) => {
        console.log("err", err);
        return of(undefined);
      })
    );
  }

  ldap(): Observable<Ldap | undefined> {
    return this.endpointApi.ldap().pipe(
      map((res) => {
        if (res) {
          let item = new Ldap();
          item.init(res);
          return res;
        } else {
          return undefined;
        }
      }),
      catchError((err) => {
        console.log("err", err);
        return of(undefined);
      })
    );
  }

  createLdap(ldap: Ldap): Observable<Ldap | undefined> {
    return this.endpointApi.createLdap(ldap).pipe(
      map((res) => {
        let item = new Ldap();
        item.init(res);
        return res;
      }),
      catchError((err) => {
        console.log("err", err);
        return of(undefined);
      })
    );
  }

  updateLdap(ldap: Ldap): Observable<Ldap | undefined> {
    return this.endpointApi.updateLdap(ldap).pipe(
      map((res) => {
        let item = new Ldap();
        item.init(res);
        return res;
      }),
      catchError((err) => {
        console.log("err", err);
        return of(undefined);
      })
    );
  }

  deleteLdap(): Observable<any> {
    return this.endpointApi.deleteLdap().pipe(
      catchError((err) => {
        console.log("err", err);
        return of(undefined);
      })
    );
  }

  testLdap(ldap: Ldap): Observable<GenericResponse | undefined> {
    return this.endpointApi.testLdap(ldap).pipe(
      map((res) => {
        if (res != undefined) {
          let item = new GenericResponse();
          item.init(res);
          return res;
        } else {
          return undefined;
        }
      }),
      catchError((err) => {
        console.log("err", err);
        return of(undefined);
      })
    );
  }

  ngOnDestroy() {
    super.onDestroy();
  }
}
