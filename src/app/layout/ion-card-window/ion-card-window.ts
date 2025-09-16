import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonCard } from '@ui/ion-card/ion-card';
import { GHKervice } from '@core/services/GHK/ghk/ghk';

@Component({
  selector: 'ghk-ion-card-window',
  imports: [FormsModule, IonCard],
  templateUrl: './ion-card-window.html',
  styleUrl: './ion-card-window.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonCardWindow {
  readonly ghkSrv = inject(GHKervice);
}
