class InputValueError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InputValueError';
    this.cause = message;
    Object.setPrototypeOf(this, InputValueError.prototype);
  }
}
