import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GHKervice } from '@core/services/GHK/ghk/ghk';

@Component({
  selector: 'ghk-results',
  imports: [],
  templateUrl: './results.html',
  styleUrl: './results.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Results {
  ghkSrv = inject(GHKervice);
}
