import { Base } from 'src/app/common/models/model';
import { Profile } from 'src/app/modules/auth';

export class User extends Base {
  email: string;
  profile: Profile;
  activated: boolean;

  constructor() {
    super();
    this.profile = new Profile();
  }

  init(_user: User) {
    super.init(_user);
    this.email = _user.email;
    this.activated = _user.activated;
    this.profile.init(_user.profile);
  }
}
