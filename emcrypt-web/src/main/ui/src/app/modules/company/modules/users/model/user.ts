import { Base } from 'src/app/common/models/model';
import { Profile } from 'src/app/modules/auth';

export class User extends Base {
  email: string;
  profile: Profile;
  activated: boolean;
}
