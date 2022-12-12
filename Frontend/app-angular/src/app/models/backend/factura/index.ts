import { LineaFactura } from './../lineaFactura/index';
import { BaseEntity } from "../baseEntity";
import { Cliente } from "../cliente";


export interface Factura extends BaseEntity{
    empresaId: number;
    numero: string;
    fechaExpedicion: string;
    subtotal: number;
    iva: number;
    cliente: Cliente;
    lineasFactura: LineaFactura[]
}
