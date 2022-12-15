import { Factura } from '@app/models/backend/factura';
import { BaseEntity } from "../baseEntity";

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
  facturas: FacturaEmpresa[];
}

export type FacturaEmpresa = Omit<Factura, 'empresaId'>;
