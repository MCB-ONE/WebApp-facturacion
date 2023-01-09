import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { FacturasTableComponent } from './facturas-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PipesModule } from '@app/pipes/pipes.module';
import { ModalLineasFacturaModule } from '../modal-lineas-factura/modal-lineas-factura.module';


@NgModule({
  declarations: [
    FacturasTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    PipesModule
  ],
  entryComponents: [
    ModalLineasFacturaModule
  ],

  exports:[
    FacturasTableComponent
  ]
})
export class FacturasTableModule { }
