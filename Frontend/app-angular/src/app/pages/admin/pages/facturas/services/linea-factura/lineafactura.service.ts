import { LineaFactura } from '@app/models/backend/lineaFactura';
import { Injectable, OnDestroy } from '@angular/core';
import { ILineaFacturaItem } from '@app/models/frontend';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LineafacturaService implements OnDestroy{

  lineasFactura$: BehaviorSubject<ILineaFacturaItem[]> = new BehaviorSubject<ILineaFacturaItem[]>([]);
  lineasFactura: ILineaFacturaItem[] = [];

  constructor() {
    console.log('SERVICIO INICIADO')
    console.log(this.lineasFactura)
  }

  setInitial(lineas: LineaFactura[]) {
    let id = 1;
    lineas.forEach(linea => {
      const lineaFacturaItem: ILineaFacturaItem = {
        id: id,
        concepto: linea.concepto,
        precioUnitario: linea.precioUnitario,
        cantidad: linea.cantidad,
        totalLinea: linea.precioUnitario * linea.cantidad
      }
      this.lineasFactura.push(lineaFacturaItem);
      id++;
    });

    this.lineasFactura$.next(this.lineasFactura);
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
    console.log(this.lineasFactura)
  }

  remove(id: number) {
    this.lineasFactura = this.lineasFactura.filter(l => {
      return l.id != id
    });

    let idGen = 1;

    this.lineasFactura.forEach(element => {
      element.id = idGen;
      idGen++;
    });

    this.lineasFactura$.next(this.lineasFactura);
  }

  clearService(): void {
    this.lineasFactura = [];
    this.lineasFactura$.next([]);
  }

  ngOnDestroy(): void {
    console.log('SERVICIO INICIADO')
    this.lineasFactura = [];
    this.lineasFactura$.next([]);
  }

}
