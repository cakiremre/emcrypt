import { Token } from "prismjs";
import { Base, Language } from "src/app/common/models/model";
import { __propKey } from "tslib";

export class Role {
  name: string;
}

export class Profile {
  firstName: string;
  lastName: string;
  prefer: Language;

  init(_profile: Profile) {
    if (_profile) {
      this.firstName = _profile.firstName;
      this.lastName = _profile.lastName;
      this.prefer = _profile.prefer;
    }
  }
}

export class Reader {
  address: string;

  init(_reader: Reader) {
    this.address = _reader.address;
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

    this.username = _user.username || "";
    this.password = _user.password || "";

    this.authorities = _user.authorities || [];
    this.profile = new Profile();
    this.profile.init(_user.profile);

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

export class TokenResponse {
  code: number;
  token: string;

  init(auth: TokenResponse) {
    this.code = auth.code;
    this.token = auth.token;
  }
}

export class AuthResponse extends TokenResponse {
  account: Account;

  setAuth(auth: AuthResponse) {
    super.init(auth);
    this.account = auth.account;
  }
}

export class ReaderResponse extends TokenResponse {
  reader: Reader;

  setReader(auth: ReaderResponse) {
    super.init(auth);
    this.reader = auth.reader;
  }
}
