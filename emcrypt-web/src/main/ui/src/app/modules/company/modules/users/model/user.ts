import { Base } from "src/app/common/models/model";
import { Profile } from "src/app/modules/auth";

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
    Object.assign(this, _user);
    this.profile = Object.assign(new Profile(), _user.profile);
  }
}
