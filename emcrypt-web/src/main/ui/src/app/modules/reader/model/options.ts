export class Options {
  emcrypt: boolean;
  forward: boolean;
  expire: boolean;
  expireAt: Date;
  delay: boolean;
  delayInMinutes: boolean;
  delayAt: Date;

  init(_options: Options) {
    Object.assign(this, _options);
  }
}
