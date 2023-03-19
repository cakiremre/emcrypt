import { Injectable, OnDestroy } from "@angular/core";
import {
  Observable,
  BehaviorSubject,
  of,
  Subscription,
  throwError,
} from "rxjs";
import { map, catchError, switchMap, finalize } from "rxjs/operators";
import {
  Account,
  Reader,
  ReaderResponse,
  TokenResponse,
} from "../models/model";
import { AuthResponse } from "../models/model";
import { AuthHTTPService } from "./auth-http";
import { Params, Router } from "@angular/router";
import {
  GenericDataResponse,
  GenericResponse,
} from "src/app/common/models/model";

export type UserType = Account | Reader | undefined;
export const authLocalStorageToken = `EMCRYPT-AUTH-JWT`;

@Injectable({
  providedIn: "root",
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
  login(email: string, password: string): Observable<Account | undefined> {
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
        console.error("err", err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  otpReader(address: string): Observable<GenericResponse> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.otpReader(address).pipe(
      map((response: GenericResponse) => {
        return response;
      }),
      catchError((err) => {
        console.log("err", err);
        let errorResponse = new GenericResponse();
        errorResponse.code = 409;
        errorResponse.message = err.message;
        return of(errorResponse);
      }),
      finalize(() => {
        this.isLoadingSubject.next(false);
      })
    );
  }

  otpLogin(address: string, code: string): Observable<Reader | undefined> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.authenticateReader(address, code).pipe(
      map((auth: ReaderResponse) => {
        const result = this.setAuthFromLocalStorage(auth);
        let reader: UserType = new Reader();
        reader.init(auth.reader);
        this.setReader(reader);
        return reader;
      }),
      catchError((err) => {
        console.error("err", err);
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
        console.error("err", err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  logout() {
    localStorage.removeItem(authLocalStorageToken);
    this.router.navigate(["/auth/login"], {
      queryParams: {},
    });
  }

  logoutReader(queryParams: Params) {
    localStorage.removeItem(authLocalStorageToken);
    this.router.navigate(["/secure-read/auth"], {
      queryParams: queryParams,
    });
  }

  setUser(account: Account) {
    this.currentUserSubject.next(account);
  }

  setReader(reader: Reader) {
    this.currentUserSubject.next(reader);
  }

  getUserByToken(): Observable<UserType> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.token) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.authHttpService.getUserByToken(auth.token).pipe(
      map((response: GenericDataResponse<any>) => {
        // any is Account | Reader FIXME later
        let user = response.data;
        if (user.password) {
          let acc: UserType = new Account();
          acc.init(user);
          if (user) {
            this.currentUserSubject.next(acc);
          } else {
            this.logout();
          }
        } else if (user.address) {
          let reader: UserType = new Reader();
          reader.init(user);
          if (user) {
            this.currentUserSubject.next(reader);
          } else {
            this.logoutReader({});
          }
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
      if (acc instanceof Account) {
        if (acc.hasRole("ROLE_ADMIN")) {
          this.router.navigate(["/admin/dashboard"]);
        }

        if (acc.hasRole("ROLE_MANAGER")) {
          this.router.navigate(["/company/overview"]);
        }
      } else {
        // home-page of reader
      }

      // FIXME role match olmuyorsa redir component görünüyor.
    } else {
      this.logout();
    }
  }

  // private methods
  private setAuthFromLocalStorage(auth: TokenResponse): boolean {
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
