export class Role {
  name: string;
}

export class Account {
  id: string;
  username: string;
  password: string;
  authorities: Role[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;

  setUser(_user: Account) {
    this.id = _user.id;
    this.username = _user.username || '';
    this.password = _user.password || '';
    this.authorities = _user.authorities || [];
    this.accountNonExpired = _user.accountNonExpired || true;
    this.accountNonLocked = _user.accountNonLocked || true;
    this.credentialsNonExpired = _user.credentialsNonExpired || true;
    this.enabled = _user.enabled || true;
  }

  hasRole(role: string): boolean {
    let has = false;
    this.authorities.forEach((a) => {
      if (a.name === role) {
        has = true;
      }
    });
    return has;
  }
}

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
