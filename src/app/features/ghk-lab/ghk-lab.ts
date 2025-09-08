import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Ion } from '@core/models/Ion';
import { Header } from '@layout/header/header';
import { IonCardWindow } from '@layout/ion-card-window/ion-card-window';
import { Results } from '@layout/results/results';
import { CalculationError } from '@core/errors/CalculationError';
import { InputValueError } from '@core/errors/InputValueError';
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
  ghkSrv = inject(GHKervice);

  ion: Ion = {
    uuid: self.crypto.randomUUID(),
    name: '',
    charge: '+',
    permeability: 1,
    concentrationOut: 10,
    concentrationIn: 100,
  };

  calcErr() {
    throw new CalculationError('Errore di calcolo');
  }

  inputErr() {
    throw new InputValueError('Errore di input');
  }
}
