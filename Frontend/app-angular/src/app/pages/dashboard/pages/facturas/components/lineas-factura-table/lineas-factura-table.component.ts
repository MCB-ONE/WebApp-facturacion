import { LineaFactura } from '@app/models/backend/lineaFactura/index';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { LineaFacturaFormComponent } from './../../pages/new-factura/components/linea-factura-form/linea-factura-form.component';
import { Subscription } from 'rxjs';
import { LineafacturaService } from '../../services';

@Component({
  selector: 'app-lineas-factura-table',
  templateUrl: './lineas-factura-table.component.html',
  styleUrls: ['./lineas-factura-table.component.scss']
})
export class LineasFacturaTableComponent implements OnInit, OnDestroy {

  displayedColumns = ['concepto', 'precioUnitario', 'cantidad', 'totalLinea', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  private serviceSubscribe!: Subscription;

  constructor(
    private lineasFacturaService: LineafacturaService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.lineasFacturaService.getAll();
    this.serviceSubscribe = this.lineasFacturaService.lineasFactura$.subscribe(res => {
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
    this.lineasFacturaService.remove(id);
  }

  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }


}
