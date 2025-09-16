import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Header } from '@layout/header/header';
import { IonCardWindow } from '@layout/ion-card-window/ion-card-window';
import { Results } from '@layout/results/results';
import { GHKervice } from '@core/services/GHK/ghk/ghk';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ghk-ghk-lab',
  imports: [
    Header,
    IonCardWindow,
    Results,
    Header,
    Header,
    Header,
    IonCardWindow,
    Results,
    FormsModule,
  ],
  templateUrl: './ghk-lab.html',
  styleUrl: './ghk-lab.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhkLab {
  readonly ghkSrv = inject(GHKervice);
}
