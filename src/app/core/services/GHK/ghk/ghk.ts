import { computed, Injectable, signal } from '@angular/core';
import { chargeType, CIon, Ion } from '@core/models/Ion';
import { IonResults, Results } from '@core/models/Results';

import { add, format, log, multiply, number, subtract } from 'mathjs';
import {
  CONC_IN_MAX_VALUE,
  CONC_IN_MIN_VALUE,
  CONC_OUT_MIN_VALUE,
  FARADAY_CONSTANT,
  GAS_CONSTANT,
  PERMEABILITY_MAX_VALUE,
  PERMEABILITY_MIN_VALUE,
} from '@core/constant/constant';
import { InputValueError } from '@core/errors/InputValueError';
import { ionConfig } from '@core/models/ionConfig';
import { IonProvidingError } from '@core/errors/IonProvidingError';

@Injectable({
  providedIn: 'root',
})
export class GHKervice {
  public ionList = signal<CIon[]>(ionConfig.standardIons); // ionConfig.standardIons
  public temperature = signal<number>(310); // K

  public results = computed<Results>(() => {
    const potential = this.calculateMembranePotential(this.ionList());

    if (potential === null) {
      return {
        ready: false,
        potential: 0,
        ionResults: [],
      };
    }

    const ionResults = this.calculateNerstPotentialAllIon(this.ionList(), potential);

    return {
      ready: true,
      potential,
      ionResults,
    };
  });

  /**
   * @public
   * @description Set the temperature in Kelvin provided in Celsius
   * @param temperature Temperature in Kelvin
   *
   * @throws {InputValueError} If the temperature is below absolute zero (-273.15 °C)
   */
  public setTemperatureCelsius(temperature: number): void {
    if (temperature < -273.15) {
      throw new InputValueError('Temperature cannot be below absolute zero (-273.15 °C)');
    }

    let res = number(add(multiply(temperature, 1.0), 273.15));
    this.temperature.set(number(format(res, { notation: 'fixed', precision: 2 })));
  }

  /**
   * @public
   * @description Set the temperature in Kelvin
   * @param temperature Temperature in Celsius
   *
   * @throws {InputValueError} If the temperature is below absolute zero (0° K)
   */
  public setTemperatureKelvin(temperature: number): void {
    if (temperature < 0) {
      throw new InputValueError('Temperature cannot be below absolute zero (0 K)');
    }
    this.temperature.set(temperature);
  }

  /**
   * @public
   * @description Add a new ion to the ion list
   * @param name name of the ion
   * @param charge charge of the ion
   * @param permeability permeability of the ion
   * @param concentrationOut concentration outside the cell
   * @param concentrationIn concentration inside the cell
   * @throws {InputValueError} If any of the input values are invalid
   */
  public addNewCustomIon(
    name: string,
    charge: chargeType,
    permeability: number,
    concentrationOut: number,
    concentrationIn: number,
  ): void {
    if (!name || name.trim() === '') {
      throw new InputValueError('Ion name cannot be empty');
    }

    if (permeability < PERMEABILITY_MIN_VALUE || permeability > PERMEABILITY_MAX_VALUE) {
      throw new InputValueError(
        `Permeability must be between ${PERMEABILITY_MIN_VALUE} and ${PERMEABILITY_MAX_VALUE}`,
      );
    }

    if (concentrationOut < CONC_OUT_MIN_VALUE || concentrationOut > CONC_OUT_MIN_VALUE) {
      throw new InputValueError(
        `Concentration outside the cell must be between ${CONC_OUT_MIN_VALUE} and ${CONC_OUT_MIN_VALUE}`,
      );
    }

    if (concentrationIn < CONC_IN_MIN_VALUE || concentrationIn > CONC_IN_MAX_VALUE) {
      throw new InputValueError(
        `Concentration inside the cell must be between ${CONC_IN_MIN_VALUE} and ${CONC_IN_MAX_VALUE}`,
      );
    }

    const newIon: Ion = {
      uuid: self.crypto.randomUUID(),
      name,
      charge,
      permeability,
      concentrationOut,
      concentrationIn,
    };
    this.ionList.update((ions) => [...ions, new CIon(newIon)]);
  }

  /**
   * @public
   * @description Add an empty ion to the ion list
   */
  public addEmptyIon(): void {
    const newIon: Ion = {
      uuid: self.crypto.randomUUID(),
      name: '',
      charge: '+',
      permeability: 1,
      concentrationOut: 10,
      concentrationIn: 100,
    };
    this.ionList.update((ions) => [...ions, new CIon(newIon)]);
  }

  /**
   * @public
   * @description Remove an ion from the ion list
   * @param ion Ion to be removed
   * @throws {IonProvidingError} If the ion is undefined
   */
  public removeIon(ion: CIon): void {
    if (!ion) {
      throw new IonProvidingError('Ion is undefined. Please provide a valid ion.');
    }

    this.ionList.update((ions) => ions.filter((i) => i.getUUID() !== ion.getUUID()));
  }

  /**
   * @public
   * @description Calculate the membrane potential  using the GHK equation
   * @throws {CalculationError} If the ion list is empty
   */
  public calculateMembranePotential(ionList: CIon[]): number | null {
    if (ionList.length === 0) {
      return null;
      //throw new CalculationError('Ion list is empty. Please add at least one ion.');
    }

    let potential = number(multiply(GAS_CONSTANT, this.temperature()) / FARADAY_CONSTANT);
    let externalContribution: number = 0;
    let internalContribution: number = 0;
    for (const ion of ionList) {
      if (ion.getCharge().includes('-')) {
        externalContribution += multiply(ion.getPermeability(), ion.getConcentrationIn());
        internalContribution += multiply(ion.getPermeability(), ion.getConcentrationOut());
        continue;
      }

      externalContribution += multiply(ion.getPermeability(), ion.getConcentrationOut());
      internalContribution += multiply(ion.getPermeability(), ion.getConcentrationIn());
    }

    externalContribution = number(
      format(externalContribution, { notation: 'fixed', precision: 3 }),
    );
    internalContribution = number(
      format(internalContribution, { notation: 'fixed', precision: 3 }),
    );

    return multiply(multiply(potential, log(externalContribution / internalContribution)), 1000);
  }

  /**
   * @public
   * @description Calculate the Nernst potential for a given ion
   * @param ion Ion for which to calculate the Nernst potential
   * @throws {IonProvidingError} If the ion is undefined
   */
  public calculateNerstPotential(ion: CIon): number {
    if (!ion) {
      throw new IonProvidingError('Ion is undefined. Please provide a valid ion.');
    }

    let potential = number(
      multiply(GAS_CONSTANT, this.temperature()) /
        multiply(ion.getChargeNumber(), FARADAY_CONSTANT),
    );

    let externalContribution = number(
      format(ion.getConcentrationOut(), { notation: 'fixed', precision: 3 }),
    );
    let internalContribution = number(
      format(ion.getConcentrationIn(), { notation: 'fixed', precision: 3 }),
    );

    return multiply(multiply(potential, log(externalContribution / internalContribution)), 1000);
  }

  /**
   * @description Calculare the Driving Force for a given ion
   * @param potential membrane potential
   * @param nerstPotentialIon Nerst Equilibrium potential of Ion
   * @private
   */
  private calculateDrivingForce(potential: number, nerstPotentialIon: number): number {
    if (isNaN(potential)) {
      throw new InputValueError('Provide a valid membrane potential value');
    }

    return subtract(potential, nerstPotentialIon);
  }

  /**
   * @description Calculare the results for all Ion in ionList
   * @param ionList list of all Ions
   * @param membranePotential Membrane Potential
   * @private
   */
  private calculateNerstPotentialAllIon(ionList: CIon[], membranePotential: number): IonResults[] {
    if (ionList.length === 0) {
      return [];
    }

    let nerstResults: IonResults[] = [];

    for (const ion of ionList) {
      let nerstPotential = this.calculateNerstPotential(ion);
      nerstResults.push({
        uuid: ion.getUUID(),
        name: ion.getName(),
        nerstPotential,
        drivingForce: this.calculateDrivingForce(membranePotential, nerstPotential),
      });
    }

    return nerstResults;
  }
}
