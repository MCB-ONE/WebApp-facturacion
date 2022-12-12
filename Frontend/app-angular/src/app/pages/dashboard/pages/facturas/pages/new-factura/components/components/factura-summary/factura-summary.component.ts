import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ILineaFacturaItem } from '@app/models/frontend';
import { LineafacturaService } from '../../../services/linea-factura/lineafactura.service';

@Component({
  selector: 'app-factura-summary',
  templateUrl: './factura-summary.component.html',
  styleUrls: ['./factura-summary.component.scss']
})
export class FacturaSummaryComponent implements OnInit {

  lineasFactura!: ILineaFacturaItem[];
  subTotal: number = 0;
  totalIva : number = 0;
  total : number = 0;

  private _iva!: number;

  @Input()
  set iva(value: number) {
      this._iva = value;
      this.lineasFactura = this.lineaFacturaService.getLineas();
      this.getSummary();
      console.log(value);

  }
  get minor(): number {
      return this._iva;
  }


  constructor(private lineaFacturaService: LineafacturaService,) { }

  ngOnInit(): void {
    this.lineasFactura = this.lineaFacturaService.getLineas();
    this.lineaFacturaService.lineasFacturaUpdated.subscribe((data) => {
        this.lineasFactura = data;
        this.getSummary();
        console.log(this.lineasFactura)
    });
    this.getSummary();
    console.log(this.lineasFactura);
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


}
