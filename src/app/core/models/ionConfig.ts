import { CIon, Ion } from './Ion';

export type IonConfig = {
  standardIons: CIon[];
};

export const ionConfig: IonConfig = {
  standardIons: [
    new CIon({
      uuid: self.crypto.randomUUID(),
      name: 'Potassium',
      charge: '+',
      permeability: 100,
      concentrationIn: 100,
      concentrationOut: 10,
    }),
    new CIon({
      uuid: self.crypto.randomUUID(),
      name: 'Sodium',
      charge: '+',
      permeability: 1,
      concentrationIn: 10,
      concentrationOut: 100,
    }),
    new CIon({
      uuid: self.crypto.randomUUID(),
      name: 'Chloride',
      charge: '-',
      permeability: 10,
      concentrationIn: 10,
      concentrationOut: 100,
    }),
  ],
};
