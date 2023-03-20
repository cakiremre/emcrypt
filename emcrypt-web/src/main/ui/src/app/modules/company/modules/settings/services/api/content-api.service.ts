import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../../../environments/environment";
import { BaseApi } from "src/app/common/services/base-api";
import { Content } from "../../model/content";

const API_TENANT_URL = `${environment.apiUrl}/adm/user`;

@Injectable({
  providedIn: "root",
})
export class ContentApi extends BaseApi<Content> {
  path: string = "/box/content";

  constructor(http: HttpClient) {
    super(http);
  }
}
