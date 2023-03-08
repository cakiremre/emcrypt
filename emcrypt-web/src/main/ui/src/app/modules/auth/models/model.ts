import { Base, Language } from 'src/app/common/models/model';
import { __propKey } from 'tslib';

export class Role {
  name: string;
}

export class Profile {
  firstName: string;
  lastName: string;
  prefer: Language;

  setProfile(_profile: Profile) {
    if (_profile) {
      this.firstName = _profile.firstName;
      this.lastName = _profile.lastName;
      this.prefer = _profile.prefer;
    }
  }
}

export class Account extends Base {
  username: string;
  password: string;

  authorities: Role[];
  profile: Profile;

  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;

  init(_user: Account) {
    super.init(_user);

    this.username = _user.username || '';
    this.password = _user.password || '';

    this.authorities = _user.authorities || [];
    this.profile = new Profile();
    this.profile.setProfile(_user.profile);

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
