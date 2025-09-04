import {Ion} from './Ion';

export type IonConfig = {
  standardIons: Ion[];
}

export const ionConfig: IonConfig = {
  standardIons:[
    {
      uuid: self.crypto.randomUUID(),
      name: 'Potassium',
      charge: '+',
      permeability: 100,
      concentrationOut: 10,
      concentrationIn: 100
    },
    {
      uuid: self.crypto.randomUUID(),
      name: 'Sodium',
      charge: '+',
      permeability: 1,
      concentrationOut: 100,
      concentrationIn: 10
    },
    {
      uuid: self.crypto.randomUUID(),
      name: 'Chloride',
      charge: '-',
      permeability: 10,
      concentrationOut: 100,
      concentrationIn: 10
    }
  ]
};
