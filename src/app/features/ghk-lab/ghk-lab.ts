import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonCard } from '@ui/ion-card/ion-card';
import { Ion } from '@core/models/Ion';
import { Header } from '@layout/header/header';
import { IonCardWindow } from '@layout/ion-card-window/ion-card-window';
import { Results } from '@layout/results/results';
import { Button } from 'primeng/button';
import { CalculationError } from '@core/errors/CalculationError';
import { InputValueError } from '@core/errors/InputValueError';

@Component({
  selector: 'ghk-ghk-lab',
  imports: [
    Header,
    IonCardWindow,
    Results,
    IonCard,
    Header,
    Header,
    Header,
    IonCardWindow,
    Results,
    Button,
  ],
  templateUrl: './ghk-lab.html',
  styleUrl: './ghk-lab.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhkLab {
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
