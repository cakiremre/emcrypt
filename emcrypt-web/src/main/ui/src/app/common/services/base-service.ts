import { Injectable, OnDestroy } from '@angular/core';
import { Base, HasSubscription } from 'src/app/common/models/model';
import { catchError, map, Observable, of } from 'rxjs';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<T extends Base>
  extends HasSubscription
  implements OnDestroy
{
  constructor(private baseApi: BaseApi<T>) {
    super();
  }

  abstract instantiate(): T;

  list(): Observable<T[]> {
    const ret: T[] = [];
    return this.baseApi.list().pipe(
      map((res: T[]) => {
        res.forEach((t) => {
          let item = this.instantiate();
          item.init(t);
          ret.push(item);
        });
        return ret;
      }),
      catchError((err) => {
        console.error('err', err);
        return of(ret);
      })
    );
  }

  get(id: string): Observable<T | undefined> {
    return this.baseApi.get(id).pipe(
      map((res: T) => {
        let item = this.instantiate();
        item.init(res);
        return item;
      }),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      })
    );
  }

  create(item: T): Observable<T | undefined> {
    return this.baseApi.create(item).pipe(
      map((res: T) => {
        let item = this.instantiate();
        item.init(res);
        return item;
      }),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      })
    );
  }

  update(item: T): Observable<T | undefined> {
    return this.baseApi.update(item).pipe(
      map((res: T) => {
        let item = this.instantiate();
        item.init(res);
        return item;
      }),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.baseApi.delete(id);
  }

  ngOnDestroy() {
    super.onDestroy();
  }
}
