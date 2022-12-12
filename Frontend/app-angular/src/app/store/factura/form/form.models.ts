import { Cliente } from "@app/models/backend/cliente";
import { Factura } from "@app/models/backend/factura";
import { LineaFactura } from "@app/models/backend/lineaFactura";

export type FacturaCreateRequest = Omit<Factura, 'id'>;

export type FacturaUpdateRequest = Factura;

// Entidades anidadas
export type ClienteCreateRequest = Omit<Cliente, 'id'>;
export type ClienteUpdateRequest = Cliente;

export type LineaFacturaCreateRequest = LineaFactura;
export type LineaFacturaUpdateRequest = LineaFactura;

export interface FacturaForm {
  empresaId: number | null;
  numero: string | null;
  fechaExpedicion: string | null;
  subtotal: number | null;
  iva: number | null;
  cliente: Cliente | null;
  lineasFactura: LineaFactura[] | null;
}



