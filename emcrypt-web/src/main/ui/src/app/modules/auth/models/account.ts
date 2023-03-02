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

  firstname: string;
  lastname: string;
  pic: string;

  setUser(_user: Account) {
    this.id = _user.id;
    this.username = _user.username || '';
    this.password = _user.password || '';
    this.authorities = _user.authorities || [];
    this.accountNonExpired = _user.accountNonExpired || true;
    this.accountNonLocked = _user.accountNonLocked || true;
    this.credentialsNonExpired = _user.credentialsNonExpired || true;
    this.enabled = _user.enabled || true;

    this.firstname = _user.firstname || '';
    this.lastname = _user.lastname || '';
    this.pic = _user.pic || '#';
  }
}
