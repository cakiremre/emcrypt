import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Ldap, Smtp } from "../../model/endpoint";
import { Observable } from "rxjs";
import { API_URL } from "src/app/common/services/base-api";

@Injectable({
  providedIn: "root",
})
export class EndpointApi {
  path: string = "/adm/endpoint";

  constructor(private http: HttpClient) {}

  smtp(): Observable<Smtp> {
    return this.http.get<Smtp>(`${API_URL}${this.path}/smtp`);
  }

  createSmtp(smtp: Smtp): Observable<Smtp> {
    return this.http.post<Smtp>(`${API_URL}${this.path}/smtp`, smtp);
  }

  updateSmtp(smtp: Smtp): Observable<Smtp> {
    return this.http.put<Smtp>(`${API_URL}${this.path}/smtp`, smtp);
  }

  deleteSmtp(): Observable<any> {
    return this.http.delete(`${API_URL}${this.path}/smtp`);
  }

  ldap(): Observable<Ldap> {
    return this.http.get<Ldap>(`${API_URL}${this.path}/ldap`);
  }

  createLdap(ldap: Ldap): Observable<Ldap> {
    return this.http.post<Ldap>(`${API_URL}${this.path}/ldap`, ldap);
  }

  updateLdap(ldap: Ldap): Observable<Ldap> {
    return this.http.put<Ldap>(`${API_URL}${this.path}/ldap`, ldap);
  }

  deleteLdap(): Observable<any> {
    return this.http.delete(`${API_URL}${this.path}/ldap`);
  }
}
