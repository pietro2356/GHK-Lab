import { ChangeDetectionStrategy, Component } from '@angular/core';
import {Header} from '@app/layout/header/header';
import {IonCardWindow} from '@app/layout/ion-card-window/ion-card-window';
import {Results} from '@app/layout/results/results';
import {IonCard} from '@ui/ion-card/ion-card';
import {Ion} from '@core/models/Ion';

@Component({
  selector: 'ghk-ghk-lab',
  imports: [
    Header,
    IonCardWindow,
    Results,
    IonCard
  ],
  templateUrl: './ghk-lab.html',
  styleUrl: './ghk-lab.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GhkLab {
  ion: Ion = {
    uuid: self.crypto.randomUUID(),
    name: '',
    charge: '+',
    permeability: 1,
    concentrationOut: 10,
    concentrationIn: 100
  };
}
