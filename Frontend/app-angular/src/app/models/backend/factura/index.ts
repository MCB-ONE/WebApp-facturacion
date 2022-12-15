import { LineaFactura } from './../lineaFactura/index';
import { BaseEntity } from "../baseEntity";
import { Cliente } from "../cliente";


export interface Factura extends BaseEntity{
    empresaId: number;
    numero: number;
    fechaExpedicion: string;
    iva: number;
    cliente: Cliente;
    lineasFactura: LineaFactura[]
}
