import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ILineaFacturaItem } from '@app/models/frontend';
import { Subscription } from 'rxjs';
import { LineafacturaService } from '../../../services/linea-factura/lineafactura.service';

@Component({
  selector: 'app-factura-summary',
  templateUrl: './factura-summary.component.html',
  styleUrls: ['./factura-summary.component.scss']
})
export class FacturaSummaryComponent implements OnInit, OnDestroy {

  lineasFactura!: ILineaFacturaItem[];
  subTotal: number = 0;
  totalIva : number = 0;
  total : number = 0;

  private serviceSubscribe!: Subscription;
  private _iva!: number;

  @Input()
  set iva(value: number) {
      this._iva = value;
      this.serviceSubscribe = this.lineaFacturaService.lineasFactura$.subscribe(res => {
        this.lineasFactura = res;
        this.getSummary();
  })

  }
  get iva(): number {
      return this._iva;
  }


  constructor(private lineaFacturaService: LineafacturaService,) { }

  ngOnInit(): void {
    this.lineaFacturaService.getAll();
    this.serviceSubscribe = this.lineaFacturaService.lineasFactura$.subscribe(res => {
      this.lineasFactura = res;
      this.getSummary();
    })
  }


  getSummary(){
    var suma = 0;
    var ivaCalc = this._iva / 100;

    this.lineasFactura.forEach(element => {
      suma = suma + element.totalLinea!;
    });

    this.subTotal = suma;
    this.totalIva = suma * ivaCalc;
    this.total = (suma * ivaCalc) + suma;
  }

  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }

}
