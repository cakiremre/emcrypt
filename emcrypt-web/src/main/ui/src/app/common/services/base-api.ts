import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

export const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: "root",
})
export abstract class BaseApi<T> {
  abstract readonly path: string;

  constructor(protected http: HttpClient) {}

  // public methods
  list(): Observable<T[]> {
    return this.http.get<T[]>(`${API_URL}${this.path}/list`);
  }

  get(id: string): Observable<T> {
    return this.http.get<T>(`${API_URL}${this.path}/${id}`);
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(`${API_URL}${this.path}`, item);
  }

  update(item: T): Observable<T> {
    return this.http.put<T>(`${API_URL}${this.path}`, item);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${API_URL}${this.path}/${id}`);
  }
}
