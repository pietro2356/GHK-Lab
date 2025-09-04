import {provideRouter, Routes} from '@angular/router';
import {provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeuix/themes/aura';

export interface CoreOptions{
  routes: Routes;
}

export function provideCore({routes}: CoreOptions) {
  // Core services can be provided here
  return [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG(
      {
        ripple: true,
        inputStyle: 'outlined',
        theme:{
          preset: Aura,
          options:{
            scale: 14,
          }
        }
      }
    )
  ];
}
