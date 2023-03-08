import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class Base {
  id: string;
  created: Date;

  init(val: any) {
    this.id = val.id;
    this.created = val.created;
  }
}

export class GenericResponse {
  code: number;
  message: string;
}

export class GenericDataResponse<T> extends GenericResponse {
  data: T;
}

export enum Language {
  EN,
  TR,
  DE,
  AR,
  AZ,
}

export class HasSubscription {
  // private fields
  protected unsubscribe: Subscription[] = [];

  onDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
