import { OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

export abstract class Base {
  id: string;
  created: Date;

  init(val: any) {
    this.id = val.id;
    this.created = val.created;
  }
}

export function compare(a: Base, b: Base) {
  if (a.created < b.created) {
    return 1;
  } else if (a.created > b.created) {
    return -1;
  } else {
    return 0;
  }
}

export class GenericResponse {
  code: number;
  message: string;
}

export class GenericDataResponse<T> extends GenericResponse {
  data: T;
}

export function enumFromStringValue<T>(
  enm: { [s: string]: T },
  value: string
): T | undefined {
  return (Object.values(enm) as unknown as string[]).includes(value)
    ? (value as unknown as T)
    : undefined;
}

export enum Language {
  EN = "EN",
  TR = "TR",
  DE = "DE",
  AR = "AR",
  AZ = "AZ",
}

export class HasSubscription {
  // private fields
  protected unsubscribe: Subscription[] = [];

  onDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
