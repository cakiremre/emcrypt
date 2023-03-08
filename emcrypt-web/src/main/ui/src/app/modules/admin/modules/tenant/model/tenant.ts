import { Base } from 'src/app/common/models/model';

export enum Status {
  ENABLED,
  DISABLED,
  EXPIRED,
  DEMO,
}

export class Tenant extends Base {
  name: string;
  domain: string;
  status: Status;
  owner: string;

  init(_tenant: Tenant) {
    super.init(_tenant);

    this.name = _tenant.name;
    this.domain = _tenant.domain;
    this.status = _tenant.status;
    this.owner = _tenant.owner;
  }
}
