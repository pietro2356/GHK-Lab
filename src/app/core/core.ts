import { provideRouter, Routes } from '@angular/router';
import {
  ErrorHandler,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { GlobalErrorHandler } from '@core/services/ErrorHandler/global-error-handler/global-error-handler';

export interface CoreOptions {
  routes: Routes;
}

export function provideCore({ routes }: CoreOptions) {
  return [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    providePrimeNG({
      ripple: true,
      inputStyle: 'outlined',
      theme: {
        preset: Aura,
        options: {
          scale: 14,
        },
      },
    }),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ];
}
