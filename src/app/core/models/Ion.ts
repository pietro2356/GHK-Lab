import { UUID } from './uuid';
import { Signal, signal, WritableSignal } from '@angular/core';

export type chargeType = '-2' | '-' | '0' | '+' | '+2';
export interface Ion {
  uuid: UUID;
  name: string;
  charge: chargeType; // z
  permeability: number; // Ps
  concentrationOut: number; // [Ion]out
  concentrationIn: number; // [Ion]in
}

export type IonSignal = WritableSignal<Ion>; // signal = permeability * concentrationOut / concentrationIn

export class CIon {
  ion: WritableSignal<Ion>;

  constructor(ion: Ion) {
    this.ion = signal(ion);
  }

  getUUID(): UUID {
    return this.ion().uuid;
  }
  getName(): string {
    return this.ion().name;
  }
  getCharge(): chargeType {
    return this.ion().charge;
  }
  getPermeability(): number {
    return this.ion().permeability;
  }
  getConcentrationOut(): number {
    return this.ion().concentrationOut;
  }
  getConcentrationIn(): number {
    return this.ion().concentrationIn;
  }

  getChargeNumber(): number {
    switch (this.ion().charge) {
      case '-2':
        return -2;
      case '-':
        return -1;
      case '0':
        return 1;
      case '+':
        return 1;
      case '+2':
        return 2;
      default:
        return 1;
    }
  }

  setName(name: string) {
    this.ion.update((ion) => ({ ...ion, name }));
  }
  setCharge(charge: chargeType) {
    this.ion.update((ion) => ({ ...ion, charge }));
  }
  setPermeability(permeability: number) {
    this.ion.update((ion) => ({ ...ion, permeability }));
  }
  setConcentrationOut(concentrationOut: number) {
    this.ion.update((ion) => ({ ...ion, concentrationOut }));
  }
  setConcentrationIn(concentrationIn: number) {
    this.ion.update((ion) => ({ ...ion, concentrationIn }));
  }

  getIon(): Ion {
    return this.ion();
  }

  getReadonlyIon(): Signal<Ion> {
    return this.ion.asReadonly();
  }
}
