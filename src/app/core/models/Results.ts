import { UUID } from '@core/models/uuid';

export interface IonResults {
  uuid: UUID;
  name: string;
  nerstPotential: number; // mV
  drivingForce: number;
}

export interface Results {
  ready: boolean;
  potential: number; // mV
  ionResults: IonResults[];
}
