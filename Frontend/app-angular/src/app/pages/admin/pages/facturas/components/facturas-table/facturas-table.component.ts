import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FacturaEmpresa } from '@app/models/backend';
import { Factura } from '@app/models/backend/factura';
import { LineafacturaService } from '@app/pages/dashboard/pages/facturas/services';
import { ModalLineasFacturaComponent } from '../modal-lineas-factura/modal-lineas-factura.component';

@Component({
  selector: 'app-facturas-table',
  templateUrl: './facturas-table.component.html',
  styleUrls: ['./facturas-table.component.scss']
})
export class FacturasTableComponent implements OnInit, AfterViewInit {

  displayedColumns = ['numero', 'fechaExpedicion', 'clienteNombre', 'clienteNif', 'subtotal', 'iva', 'total', 'lineasFactura'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator, { static: false }) matPaginator!: MatPaginator | null;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @Input() tableData!: any[]

  constructor(
    private dialog: MatDialog,
    private lineasFacturaService: LineafacturaService
  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.tableData;
    // Ordenado y filtrado para objetos anidados
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'clienteNombre': return item.cliente.nombre;
        case 'clienteNif': return item.cliente.nif;
        default: return item[property];
      }
    };
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data: FacturaEmpresa, filter: string) => {
      return data.cliente.nombre.toLocaleLowerCase().includes(filter) ||
        data.cliente.nif.toString().toLocaleLowerCase().includes(filter) ||
        data.numero.toString().toLocaleLowerCase().includes(filter) ||
        data.fechaExpedicion.toString().toLocaleLowerCase().includes(filter)
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(factura: Factura): void {
    const dialogRef = this.dialog.open(ModalLineasFacturaComponent, {
      width: '720px',
      data: factura
    });


    dialogRef.afterClosed().subscribe((data) => {
      this.lineasFacturaService.lineasFactura = [];
    });
  }

}
