import { ErrorHandler, Injectable } from '@angular/core';
import { InputValueError } from '@core/errors/InputValueError';
import { CalculationError } from '@core/errors/CalculationError';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  handleError<T>(error: T): void {
    if (error instanceof InputValueError) {
      console.error('InputValueError:', error.message);
    } else if (error instanceof CalculationError) {
      console.error('CalculationError:', error.message);
    } else {
      console.error('Generic error type:', error);
    }
  }
}
