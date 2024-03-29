import { OnDestroy } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";

export abstract class Base {
  id: string;
  created: Date;

  init(val: any) {
    Object.assign(this, val);
  }
}

export class Pager {
  current: number;
  size: number;

  constructor(current: number, size: number) {
    this.current = current;
    this.size = size;
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

  init(_res: GenericResponse) {
    Object.assign(this, _res);
  }
}

export class GenericDataResponse<T> extends GenericResponse {
  data: T;
}

export class BatchSave {
  count: number;
  code: number;

  init(_batchSave: BatchSave) {
    Object.assign(this, _batchSave);
  }
}

export class BatchSaveOut {
  out: Array<BatchSave> = new Array();

  init(_out: BatchSaveOut) {
    _out.out.forEach((_item) => {
      this.out.push(Object.assign(new BatchSave(), _item));
    });
  }
}

export enum Direction {
  ASC,
  DESC,
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

  protected isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  protected isLoading: boolean;

  protected isDeleting$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  protected isDeleting: boolean;

  protected isSaving$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  protected isSaving: boolean;

  onDestroy() {
    this.isSaving$.unsubscribe();
    this.isLoading$.unsubscribe();
    this.isDeleting$.unsubscribe();

    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
