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
    super.init(_endpoint);

    this.type = _endpoint.type;
    this.password = _endpoint.password;
    this.encrypted = _endpoint.encrypted;
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

    this.url = _ldap.url;
    this.basedn = _ldap.basedn;
    this.trust = _ldap.trust;
    this.userCategory = _ldap.userCategory;
    this.firstNameAttr = _ldap.firstNameAttr;
    this.lastNameAttr = _ldap.lastNameAttr;
    this.emailAttr = _ldap.emailAttr;
    this.languageAttr = _ldap.languageAttr;
  }
}

export class Smtp extends Endpoint {
  host: string;
  port: number;
  ssl: boolean;
  auth: boolean;
  username: string;

  init(_smtp: Smtp) {
    this.host = _smtp.host;
    this.port = _smtp.port;
    this.ssl = _smtp.ssl;
    this.auth = _smtp.auth;
    this.username = _smtp.username;
  }
}
