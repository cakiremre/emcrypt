export class Subject {
  address: string;
  name: string;

  init(_subject: Subject) {
    Object.assign(this, _subject);
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

    Object.assign(this, _recipient);
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
    Object.assign(this, _attachment);
  }
}

export class Decrypted {
  from: Subject = new Subject();
  subject: string;
  content: string;
  attachments: Array<Attachment>;

  init(_decrypted: Decrypted) {
    Object.assign(this, _decrypted);
    this.from = Object.assign(new Subject(), _decrypted.from);

    if (_decrypted.attachments) {
      this.attachments = new Array();
      _decrypted.attachments.forEach((att) => {
        this.attachments.push(Object.assign(new Attachment(), att));
      });
    }
  }
}
