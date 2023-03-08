import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { Account } from '../models/model';
import { AuthResponse } from '../models/model';
import { AuthHTTPService } from './auth-http';
import { Router } from '@angular/router';
import { GenericResponse } from 'src/app/common/models/model';

export type UserType = Account | undefined;
export const authLocalStorageToken = `EMCRYPT-AUTH-JWT`;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  // public fields
  currentUser$: Observable<UserType>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserType>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUserValue(): UserType {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserType) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
  }

  // public methods
  login(email: string, password: string): Observable<UserType> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.login(email, password).pipe(
      map((auth: AuthResponse) => {
        const result = this.setAuthFromLocalStorage(auth);
        let acc: UserType = new Account();
        acc.init(auth.account);
        this.setUser(acc);
        return acc;
      }),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  setPassword(link: string, password: string): Observable<UserType> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.setPassword(link, password).pipe(
      map((auth: AuthResponse) => {
        const result = this.setAuthFromLocalStorage(auth);
        let acc: UserType = new Account();
        acc.init(auth.account);
        this.setUser(acc);
        return acc;
      }),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  logout() {
    localStorage.removeItem(authLocalStorageToken);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  setUser(account: Account) {
    this.currentUserSubject.next(account);
  }

  getUserByToken(): Observable<UserType> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.token) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.authHttpService.getUserByToken(auth.token).pipe(
      map((user: Account) => {
        let acc: UserType = new Account();
        acc.init(user);
        if (user) {
          this.currentUserSubject.next(acc);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  forgotPassword(username: string): Observable<GenericResponse> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(username)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  navigateToHome() {
    if (this.currentUserValue) {
      let acc = this.currentUserValue;
      if (acc.hasRole('ROLE_ADMIN')) {
        this.router.navigate(['/admin/dashboard']);
      }

      if (acc.hasRole('ROLE_MANAGER')) {
        this.router.navigate(['/company/overview']);
      }

      // FIXME role match olmuyorsa redir component görünüyor.
    } else {
      this.logout();
    }
  }

  // private methods
  private setAuthFromLocalStorage(auth: AuthResponse): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.token) {
      localStorage.setItem(authLocalStorageToken, auth.token);
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): AuthResponse | undefined {
    try {
      const lsValue = localStorage.getItem(authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }

      const authData = new AuthResponse();
      authData.token = lsValue;
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
