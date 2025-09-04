class CalculationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CalculationError';
    this.cause = message;
    Object.setPrototypeOf(this, InputValueError.prototype);
  }
}
