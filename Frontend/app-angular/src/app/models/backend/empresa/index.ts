import { BaseEntity } from "../baseEntity";
import { Direccion } from "../direccion";

export interface Empresa extends BaseEntity{
  nombre: string;
  nif: string;
  logo: string;
  calle: string;
  numero: number;
  codigoPostal: string;
  ciudad: string;
  provincia: string;
  pais: string;
  telefono: string;
  email: string;
}
