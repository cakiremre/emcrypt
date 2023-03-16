export class Subject {
  address: string;
  name: string;

  init(_subject: Subject) {
    this.address = _subject.address;
    this.name = _subject.name;
  }
}

export class Decrypted {
  from: Subject = new Subject();
  subject: string;
  content: string;

  init(_decrypted: Decrypted) {
    this.from = new Subject();
    this.from.init(_decrypted.from);

    this.subject = _decrypted.subject;
    this.content = _decrypted.content;
  }
}
