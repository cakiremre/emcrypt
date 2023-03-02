import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Account } from '../../models/account';
import { environment } from '../../../../../environments/environment';
import { AuthResponse } from '../../models/account';
import { GenericResponse } from 'src/app/common/models/generic-response';

const API_USERS_URL = `${environment.apiUrl}/gw/auth`;

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient) {}

  // public methods
  login(username: string, password: string): Observable<any> {
    return this.http.post<AuthResponse>(`${API_USERS_URL}/authenticate`, {
      username,
      password,
    });
  }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(username: string): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(
      `${API_USERS_URL}/forgot`,
      {},
      { params: new HttpParams().append('username', username) }
    );
  }

  setPassword(link: string, password: string): Observable<any> {
    return this.http.post<AuthResponse>(`${API_USERS_URL}/set-password`, {
      link,
      password,
    });
  }

  getUserByToken(token: string): Observable<Account> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Account>(`${API_USERS_URL}/me`, {
      headers: httpHeaders,
    });
  }
}
