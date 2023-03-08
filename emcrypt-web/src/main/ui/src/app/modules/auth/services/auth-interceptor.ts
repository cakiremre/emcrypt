import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { authLocalStorageToken, AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  publicApis: string[] = [
    `${environment.apiUrl}/api/gw/auth/authenticate`,
    `${environment.apiUrl}/api/gw/auth/forgot`,
  ];

  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if account is logged in and request is to the api url
    const token = localStorage.getItem(authLocalStorageToken);
    const isPrivate = !this.publicApis.includes(request.url);
    if (token && isPrivate) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 || err.status === 403) {
          this.router.navigate(['/login']);
        }
        return throwError(() => new Error(err.message));
      })
    );
  }
}
