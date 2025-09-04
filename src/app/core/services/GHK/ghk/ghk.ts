import { Injectable, signal } from '@angular/core';
import { chargeType, Ion } from '@core/models/Ion';
import { ionConfig } from '@core/models/ionConfig';
import { Results } from '@core/models/Results';

import { add, format, Fraction, fraction, log, multiply, number } from 'mathjs';
import {
  CONC_IN_MAX_VALUE,
  CONC_IN_MIN_VALUE,
  CONC_OUT_MIN_VALUE,
  FARADAY_CONSTANT,
  GAS_CONSTANT,
  PERMEABILITY_MAX_VALUE,
  PERMEABILITY_MIN_VALUE,
} from '@core/constant/constant';

@Injectable({
  providedIn: 'root',
})
export class GHKervice {
  #ionList = signal<Ion[]>(ionConfig.standardIons);
  #temperature = signal<number>(310); // K
  #results = signal<Results>({ ready: false, potential: 0 });

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
    this.#temperature.set(number(format(res, { notation: 'fixed', precision: 2 })));
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
    this.#temperature.set(temperature);
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
  public addNewIon(
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
    this.#ionList.update((ions) => [...ions, newIon]);
  }

  /**
   * @public
   * @description Calculate the membrane potential  using the GHK equation
   * @throws {CalculationError} If the ion list is empty
   */
  public calculateMembranePotential(): void {
    if (this.#ionList().length === 0) {
      throw new CalculationError('Ion list is empty. Please add at least one ion.');
    }

    let potential = number(multiply(GAS_CONSTANT, this.#temperature()) / FARADAY_CONSTANT);
    let externalContribution: number = 0;
    let internalContribution: number = 0;
    for (const ion of this.#ionList()) {
      if (ion.charge === '-') {
        externalContribution += multiply(ion.permeability, ion.concentrationIn);
        internalContribution += multiply(ion.permeability, ion.concentrationOut);
        continue;
      }

      externalContribution += multiply(ion.permeability, ion.concentrationOut);
      internalContribution += multiply(ion.permeability, ion.concentrationIn);
    }

    externalContribution = number(
      format(externalContribution, { notation: 'fixed', precision: 3 }),
    );
    internalContribution = number(
      format(internalContribution, { notation: 'fixed', precision: 3 }),
    );

    this.#results.set({
      ready: true,
      potential: multiply(
        multiply(potential, log(externalContribution / internalContribution)),
        1000,
      ),
    });
  }
}
