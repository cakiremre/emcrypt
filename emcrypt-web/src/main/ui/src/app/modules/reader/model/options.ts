export class Options {
  emcrypt: boolean;
  forward: boolean;
  expire: boolean;
  expireAt: Date;
  delay: boolean;
  delayInMinutes: boolean;
  delayAt: Date;

  init(_options: Options) {
    this.emcrypt = _options.emcrypt;
    this.forward = _options.forward;
    this.expire = _options.expire;
    this.expireAt = _options.expireAt;
    this.delay = _options.delay;
    this.delayInMinutes = _options.delayInMinutes;
    this.delayAt = _options.delayAt;
  }
}
