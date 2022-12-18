import { LineaFactura } from '@app/models/backend/lineaFactura';
import { Injectable } from '@angular/core';
import { ILineaFacturaItem } from '@app/models/frontend';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LineafacturaService {

  lineasFactura$: BehaviorSubject<ILineaFacturaItem[]> = new BehaviorSubject<ILineaFacturaItem[]>([]);
  lineasFactura: ILineaFacturaItem[] = [
    {
      id: 1,
      concepto: 'Coca',
      precioUnitario: 0.5,
      cantidad: 10,
      totalLinea: 5
    },
    {
      id: 2,
      concepto: 'Fanta',
      precioUnitario: 1.0,
      cantidad: 10,
      totalLinea: 10
    }
  ];

  constructor() {
  }

  getAll() {
    this.lineasFactura$.next(this.lineasFactura);
  }

  add(linea: LineaFactura) {

    let id = this.lineasFactura.length + 1;

    const lineaFacturaItem: ILineaFacturaItem = {
      id: id,
      concepto: linea.concepto,
      precioUnitario: linea.precioUnitario,
      cantidad: linea.cantidad,
      totalLinea: linea.precioUnitario * linea.cantidad
    }

    this.lineasFactura.push(lineaFacturaItem);
    this.lineasFactura$.next(this.lineasFactura);
  }

  edit(linea: ILineaFacturaItem) {
    let findElem = this.lineasFactura.find(l => l.id == linea.id);
    findElem!.concepto = linea.concepto;
    findElem!.cantidad = linea.cantidad;
    findElem!.precioUnitario = linea.precioUnitario;
    findElem!.totalLinea = linea.precioUnitario * linea.cantidad
    this.lineasFactura$.next(this.lineasFactura);
  }

  remove(id: number) {
    this.lineasFactura = this.lineasFactura.filter(l => {
      return l.id != id
    });
    this.lineasFactura$.next(this.lineasFactura);
  }

}
