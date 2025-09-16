import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GHKervice } from '@core/services/GHK/ghk/ghk';
import { Button } from 'primeng/button';

@Component({
  selector: 'ghk-header',
  imports: [FormsModule, Button],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  readonly ghkSrv = inject(GHKervice);

  protected scrollToResults() {
    const resultsSection = document.getElementById('results');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }
}
