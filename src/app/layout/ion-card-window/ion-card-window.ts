import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { IonCard } from '@ui/ion-card/ion-card';
import { GHKervice } from '@core/services/GHK/ghk/ghk';

@Component({
  selector: 'ghk-ion-card-window',
  imports: [Button, FormsModule, IonCard],
  templateUrl: './ion-card-window.html',
  styleUrl: './ion-card-window.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonCardWindow {
  ghkSrv = inject(GHKervice);
}
