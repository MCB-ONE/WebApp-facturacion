import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ILineaFacturaItem } from '@app/models/frontend/lineaFactura';

@Component({
  selector: 'app-linea-factura',
  templateUrl: './linea-factura.component.html',
  styleUrls: ['./linea-factura.component.scss']
})
export class LineaFacturaComponent implements OnInit {

  @Input() item!: ILineaFacturaItem;

  @Output() edit = new EventEmitter<ILineaFacturaItem>();
  @Output() delete = new EventEmitter<ILineaFacturaItem>();

  constructor() { }

  ngOnInit(): void {
  }

  onEdit(linea: ILineaFacturaItem) : void {
    this.edit.emit(linea);
  }

  onDelete(linea: ILineaFacturaItem): void {
    this.delete.emit(linea);
  }

}
