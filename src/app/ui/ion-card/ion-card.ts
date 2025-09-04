import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {SliderModule} from 'primeng/slider';
import {SelectButtonModule} from 'primeng/selectbutton';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {InputNumberModule} from 'primeng/inputnumber';
import {
  CONC_IN_MAX_VALUE,
  CONC_IN_MIN_VALUE, CONC_OUT_MAX_VALUE, CONC_OUT_MIN_VALUE,
  PERMEABILITY_MAX_VALUE,
  PERMEABILITY_MIN_VALUE
} from '../../core/constant/constant';
import {Ion} from '../../core/models/Ion';



@Component({
  selector: 'app-ion-card',
  imports: [InputTextModule, SelectButtonModule, SliderModule, CardModule, ButtonModule, FormsModule, InputNumberModule],
  templateUrl: './ion-card.html',
  styleUrl: './ion-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonCard {
  ionIn = input.required<Ion>();

  chargeOptions = [
    {label: '+', value: '+'},
    {label: '0', value: '0'},
    {label: '-', value: '-'}
  ];

  removeCard(){
    console.warn("Remove card not implemented yet.");
  }

  protected readonly PERMEABILITY_MIN_VALUE = PERMEABILITY_MIN_VALUE;
  protected readonly PERMEABILITY_MAX_VALUE = PERMEABILITY_MAX_VALUE;
  protected readonly CONC_IN_MIN_VALUE = CONC_IN_MIN_VALUE;
  protected readonly CONC_IN_MAX_VALUE = CONC_IN_MAX_VALUE;
  protected readonly CONC_OUT_MIN_VALUE = CONC_OUT_MIN_VALUE;
  protected readonly CONC_OUT_MAX_VALUE = CONC_OUT_MAX_VALUE;
}
