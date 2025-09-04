import {UUID} from './uuid';

export type chargeType = '+' | '0' | '-';
export interface Ion{
  uuid: UUID
  name: string;
  charge: chargeType; // z
  permeability: number; // Ps
  concentrationOut: number; // [Ion]out
  concentrationIn: number; // [Ion]in
}
