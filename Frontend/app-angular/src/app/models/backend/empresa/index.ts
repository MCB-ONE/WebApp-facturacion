import { BaseEntity } from "../baseEntity";
import { Direccion } from "../direccion";

export interface Empresa extends BaseEntity{
  emailUsuario: string;
  nombre: string;
  nif: string;
  logo: string;
  direcciones: Direccion;
}
