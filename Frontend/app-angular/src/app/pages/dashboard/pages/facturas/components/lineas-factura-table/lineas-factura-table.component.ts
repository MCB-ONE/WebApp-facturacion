import { LineaFactura } from '@app/models/backend/lineaFactura/index';
import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { LineafacturaService } from '../../pages/new-factura/services/linea-factura/lineafactura.service';
import { LineaFacturaFormComponent } from './../../pages/new-factura/components/linea-factura-form/linea-factura-form.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lineas-factura-table',
  templateUrl: './lineas-factura-table.component.html',
  styleUrls: ['./lineas-factura-table.component.scss']
})
export class LineasFacturaTableComponent implements OnInit {

  displayedColumns = ['concepto', 'precioUnitario', 'cantidad', 'totalLinea', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);
  private serviceSubscribe!: Subscription;

  constructor(
    private lineasFacturaService: LineafacturaService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.lineasFacturaService.getAll();
    this.serviceSubscribe = this.lineasFacturaService.lineasFactura$.subscribe(res => {
      console.log(res);
      this.dataSource.data = res;
    })
  }


  onEdit(data: LineaFactura) {
    const dialogRef = this.dialog.open(LineaFacturaFormComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.lineasFacturaService.edit(result);
      }
    });
  }

  onDelete(id: number) {
    console.log(id)
    this.lineasFacturaService.remove(id);
  }

  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }


}
