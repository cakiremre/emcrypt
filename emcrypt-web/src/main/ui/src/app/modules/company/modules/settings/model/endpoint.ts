import { Base } from "src/app/common/models/model";

export enum Type {
  SMTP,
  LDAP,
}

export class Endpoint extends Base {
  type: Type;
  password: string;
  encrypted: boolean;

  init(_endpoint: Endpoint) {
    Object.assign(this, _endpoint);
  }
}

export class Ldap extends Endpoint {
  url: string;
  basedn: string;
  trust: boolean;
  userdn: string;
  userCategory: string;
  firstNameAttr: string;
  lastNameAttr: string;
  emailAttr: string;
  languageAttr: string;

  init(_ldap: Ldap) {
    super.init(_ldap);

    Object.assign(this, _ldap);
  }
}

export class Smtp extends Endpoint {
  host: string;
  port: number;
  ssl: boolean;
  auth: boolean;
  username: string;

  init(_smtp: Smtp) {
    super.init(_smtp);
    Object.assign(this, _smtp);
  }
}
