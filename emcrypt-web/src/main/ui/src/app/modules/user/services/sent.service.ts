import { Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
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
  constructor(sentApi: SentApi) {
    super(sentApi);
  }
}
