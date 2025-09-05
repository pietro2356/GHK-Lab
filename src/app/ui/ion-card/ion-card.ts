import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import {
  CONC_IN_MAX_VALUE,
  CONC_IN_MIN_VALUE,
  CONC_OUT_MAX_VALUE,
  CONC_OUT_MIN_VALUE,
  PERMEABILITY_MAX_VALUE,
  PERMEABILITY_MIN_VALUE,
} from '../../core/constant/constant';
import { CIon } from '../../core/models/Ion';
import { GHKervice } from '@core/services/GHK/ghk/ghk';

@Component({
  selector: 'ghk-ion-card',
  imports: [
    InputTextModule,
    SelectButtonModule,
    SliderModule,
    CardModule,
    ButtonModule,
    FormsModule,
    InputNumberModule,
  ],
  templateUrl: './ion-card.html',
  styleUrl: './ion-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonCard {
  ghkSrv = inject(GHKervice);
  ionIn = input.required<CIon>();

  chargeOptions = [
    { label: '-2', value: '-2' },
    { label: '-1', value: '-' },
    { label: '0', value: '0' },
    { label: '+1', value: '+' },
    { label: '+2', value: '+2' },
  ];

  protected readonly PERMEABILITY_MIN_VALUE = PERMEABILITY_MIN_VALUE;
  protected readonly PERMEABILITY_MAX_VALUE = PERMEABILITY_MAX_VALUE;
  protected readonly CONC_IN_MIN_VALUE = CONC_IN_MIN_VALUE;
  protected readonly CONC_IN_MAX_VALUE = CONC_IN_MAX_VALUE;
  protected readonly CONC_OUT_MIN_VALUE = CONC_OUT_MIN_VALUE;
  protected readonly CONC_OUT_MAX_VALUE = CONC_OUT_MAX_VALUE;
  protected readonly parseFloat = parseFloat;
}
