import { LineaFactura } from '@app/models/backend/lineaFactura/index';
import { Factura } from '@app/models/backend/factura';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ILineaFacturaItem } from '@app/models/frontend';
import { Subscription } from 'rxjs';
import * as fromFacturaForm from '@app/store/factura/form/form.reducer';
import { FormActions } from '@app/store/factura/form/form.actions';
import { Store } from '@ngrx/store';
import { LineafacturaService } from '../../services';
import { LineaFacturaFormComponent } from '../linea-factura-form/linea-factura-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-lineas-factura',
  templateUrl: './modal-lineas-factura.component.html',
  styleUrls: ['./modal-lineas-factura.component.scss']
})
export class ModalLineasFacturaComponent implements OnInit, OnDestroy {

  displayedColumns = ['concepto', 'precioUnitario', 'cantidad', 'totalLinea', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  isLoaded: boolean = false;

  private serviceSubscribe$!: Subscription;

  constructor(public dialogRef: MatDialogRef<ModalLineasFacturaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Factura,
    private lineasFacturaService: LineafacturaService,
    private dialog: MatDialog,
    private store: Store<fromFacturaForm.FormState>
  ) { }

  ngOnInit(): void {
    this.lineasFacturaService.setInitial(this.data.lineasFactura);

    this.serviceSubscribe$ = this.lineasFacturaService.lineasFactura$.subscribe(res => {
      this.dataSource.data = res;
      this.isLoaded = true;
    })
  }


  //Crud líneas factura
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

  onUpdate(): void {
    let lineasUpdate!: LineaFactura[];
    this.serviceSubscribe$ = this.lineasFacturaService.lineasFactura$.subscribe(res => {
      lineasUpdate = res;
    })

    this.lineasFacturaService.lineasFactura$.subscribe(res => {
      lineasUpdate = res;
    })

    this.store.dispatch(FormActions.updateLineasStart({
      facturaId: this.data.id,
      lineasFactura: lineasUpdate
    }))

    this.dialogRef.close(lineasUpdate);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.lineasFacturaService.clearService();
    this.serviceSubscribe$.unsubscribe();
  }


}
