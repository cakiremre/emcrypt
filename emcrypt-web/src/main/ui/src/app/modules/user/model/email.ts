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
    this.identifier = _email.identifier;

    this.from = new Subject();
    this.from.init(_email.from);

    this.to = new Array<Recipient>();
    _email.to.forEach((rcp) => {
      let recipient = new Recipient();
      recipient.init(rcp);
      this.to.push(recipient);
    });

    this.cc = new Array<Recipient>();
    _email.cc.forEach((rcp) => {
      let recipient = new Recipient();
      recipient.init(rcp);
      this.cc.push(recipient);
    });

    this.bcc = new Array<Recipient>();
    _email.bcc.forEach((rcp) => {
      let recipient = new Recipient();
      recipient.init(rcp);
      this.bcc.push(recipient);
    });
    this.all = this.to.concat(this.cc).concat(this.bcc);

    this.subject = _email.subject;

    this.options = new Options();
    this.options.init(_email.options);

    this.attachments = new Array<Attachment>();
    _email.attachments.forEach((att) => {
      let attachment = new Attachment();
      attachment.init(att);
      this.attachments.push(attachment);
    });
  }
}
