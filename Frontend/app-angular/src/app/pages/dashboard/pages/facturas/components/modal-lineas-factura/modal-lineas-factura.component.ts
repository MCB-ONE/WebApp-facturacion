import { LineaFactura } from './../../../../../../models/backend/lineaFactura/index';
import { Factura } from '@app/models/backend/factura';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ILineaFacturaItem } from '@app/models/frontend';
import { LineafacturaService } from '../../pages/new-factura/services/linea-factura/lineafactura.service';
import { LineaFacturaFormComponent } from '../../pages/new-factura/components/linea-factura-form/linea-factura-form.component';

@Component({
  selector: 'app-modal-lineas-factura',
  templateUrl: './modal-lineas-factura.component.html',
  styleUrls: ['./modal-lineas-factura.component.scss']
})
export class ModalLineasFacturaComponent implements OnInit {

  displayedColumns = ['concepto', 'precioUnitario', 'cantidad', 'totalLinea', 'actions'];
  dataSource = new MatTableDataSource<any>([]);


  constructor(public dialogRef: MatDialogRef<ModalLineasFacturaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Factura,
    private lineasFacturaService: LineafacturaService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
      this.dataSource.data = this.lineasFacturaService.getLineas();
      this.lineasFacturaService.lineasFacturaUpdated.subscribe((data) => {
        console.log(data);
        this.dataSource.data  = data;
      });
  }


    // Crud líneas factura
    onAdd(): void {
      this.dialog.open(LineaFacturaFormComponent, {
        width: '650px',
        height: 'fit-content',
        data: null
      });
    }

    onEdit(lineaItem: ILineaFacturaItem): void {
      const value: LineaFactura = {
        concepto: lineaItem.concepto,
        precioUnitario: lineaItem.precioUnitario,
        cantidad: lineaItem.cantidad,
        totalLinea: lineaItem.totalLinea
      }

      this.dialog.open(LineaFacturaFormComponent, {
        width: '480px',
        height: 'fit-content',
        data: { value }
      });
    }

    onDelete(linea: ILineaFacturaItem): void {
      this.lineasFacturaService.deleteLinea(linea);
    }

}
