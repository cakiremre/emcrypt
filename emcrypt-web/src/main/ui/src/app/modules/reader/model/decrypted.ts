export class Subject {
  address: string;
  name: string;

  init(_subject: Subject) {
    this.address = _subject.address;
    this.name = _subject.name;
  }

  getInetAddress() {
    return this.name + " - " + this.address;
  }
}

export class Recipient extends Subject {
  revoked: boolean;
  accessed: boolean;

  init(_recipient: Recipient) {
    super.init(_recipient);

    this.accessed = _recipient.accessed;
    this.revoked = _recipient.revoked;
  }
}

export class Attachment {
  id: string;
  name: string;
  size: number;
  inline: boolean;
  format: string;
  data: string;

  init(_attachment: Attachment) {
    this.id = _attachment.id;
    this.name = _attachment.name;
    this.size = _attachment.size;
    this.inline = _attachment.inline;
    this.format = _attachment.format;
  }
}

export class Decrypted {
  from: Subject = new Subject();
  subject: string;
  content: string;
  attachments: Array<Attachment>;

  init(_decrypted: Decrypted) {
    this.from = new Subject();
    this.from.init(_decrypted.from);

    this.subject = _decrypted.subject;
    this.content = _decrypted.content;
    if (_decrypted.attachments) {
      this.attachments = new Array();
      _decrypted.attachments.forEach((att) => {
        let attachment = new Attachment();
        attachment.init(att);
        this.attachments.push(attachment);
      });
    }
  }
}
