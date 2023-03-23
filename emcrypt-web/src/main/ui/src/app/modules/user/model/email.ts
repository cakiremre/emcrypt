import { Base } from "src/app/common/models/model";
import { Attachment, Recipient, Subject } from "../../reader/model/decrypted";
import { Options } from "../../reader/model/options";

export class Email extends Base {
  identifier: string;
  from: Subject;
  to: Array<Recipient>;
  cc: Array<Recipient>;
  bcc: Array<Recipient>;
  all: Array<Recipient>;
  subject: String;
  options: Options;
  attachments: Array<Attachment>;

  init(_email: Email) {
    super.init(_email);
    Object.assign(this, _email);

    this.from = Object.assign(new Subject(), _email.from);

    this.to = new Array<Recipient>();
    _email.to.forEach((rcp) => {
      this.to.push(Object.assign(new Recipient(), rcp));
    });

    this.cc = new Array<Recipient>();
    _email.cc.forEach((rcp) =>
      this.cc.push(Object.assign(new Recipient(), rcp))
    );

    this.bcc = new Array<Recipient>();
    _email.bcc.forEach((rcp) => {
      this.bcc.push(Object.assign(new Recipient(), rcp));
    });
    this.all = this.to.concat(this.cc).concat(this.bcc);

    this.options = Object.assign(new Options(), _email.options);

    this.attachments = new Array<Attachment>();
    _email.attachments.forEach((att) => {
      this.attachments.push(Object.assign(new Attachment(), att));
    });
  }
}
