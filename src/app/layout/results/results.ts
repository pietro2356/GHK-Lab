import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GHKervice } from '@core/services/GHK/ghk/ghk';
import { Button } from 'primeng/button';

@Component({
  selector: 'ghk-results',
  imports: [Button],
  templateUrl: './results.html',
  styleUrl: './results.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Results {
  readonly ghkSrv = inject(GHKervice);

  protected goOnTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
