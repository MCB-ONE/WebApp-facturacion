import { BaseEntity } from "../baseEntity";

export interface Direccion extends BaseEntity{
  calle: string;
  numero: number;
  codigoPostal: string;
  ciudad: string;
  provincia: string;
  pais: string;
  telefono: number;
  email: string;
}
