import { EventEmitter, Injectable } from '@angular/core';
import { ILineaFacturaItem } from '@app/models/frontend';

@Injectable({
  providedIn: 'root'
})
export class LineafacturaService {

  lineasFactura: ILineaFacturaItem[] = [
    {
      id: 1,
      concepto: "Coca-cola",
       precioUnitario: 0.40,
       cantidad: 20,
       totalLinea: 80
    },
    {
      id: 2,
      concepto: "Fanta",
       precioUnitario: 0.50,
       cantidad: 20,
       totalLinea: 80
    },
    {
      id: 3,
      concepto: "Nestea",
       precioUnitario: 0.30,
       cantidad: 2,
       totalLinea: 80
    }
  ];

  lineasFacturaUpdated: EventEmitter<ILineaFacturaItem[]> = new EventEmitter();

  constructor() { }

  getLineas(): ILineaFacturaItem[] {
    return this.lineasFactura;
  }

  deleteLinea(linea: ILineaFacturaItem): void {
    const i = this.lineasFactura.indexOf(linea);
    this.lineasFactura.splice(i, 1);

    this.lineasFacturaUpdated.emit(this.lineasFactura);
  }

  updateLinea(linea: ILineaFacturaItem): void {
    const i = this.lineasFactura.indexOf(linea);
    this.lineasFactura.splice(i, 1);

    const total = linea.precioUnitario * linea.cantidad

    const newLineaFactura: ILineaFacturaItem = {
      id: linea.id,
      concepto: linea.concepto,
      precioUnitario: linea.precioUnitario,
      cantidad: linea.cantidad,
      totalLinea: total
    }

    this.lineasFactura.push(newLineaFactura);

    this.lineasFacturaUpdated.emit(this.lineasFactura);
  }

  addLinea(lineaFactura: ILineaFacturaItem) {
    let id = this.lineasFactura.length + 2;

    const total = lineaFactura.precioUnitario * lineaFactura.cantidad

    const newLineaFactura: ILineaFacturaItem = {
      id: id,
      concepto: lineaFactura.concepto,
      precioUnitario: lineaFactura.precioUnitario,
      cantidad: lineaFactura.cantidad,
      totalLinea: total
    }
    this.lineasFactura.unshift(newLineaFactura);

    this.lineasFacturaUpdated.emit(this.lineasFactura);
  }


}
