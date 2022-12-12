export interface ILineaFacturaItem{
    id: number;
    concepto: string;
    precioUnitario: number;
    cantidad: number;
    totalLinea: number | null;
}
