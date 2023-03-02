import { Account } from './account';

export class AuthResponse {
  code: number;
  token: string;
  account: Account;

  setAuth(auth: AuthResponse) {
    this.code = auth.code;
    this.token = auth.token;
    this.account = auth.account;
  }
}
