export class IonProvidingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'IonProvidingError';
    this.cause = message;
    Object.setPrototypeOf(this, IonProvidingError.prototype);
  }
}
