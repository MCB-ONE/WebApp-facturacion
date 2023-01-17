import { ModalFacturaPdfModule } from './../modal-factura-pdf/modal-factura-pdf.module';
import { MatButtonModule } from '@angular/material/button';
import { FacturaService } from './../../services/factura/factura.service';
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
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    PipesModule,
    ModalFacturaPdfModule
  ],
  exports:[
    FacturasTableComponent
  ],
  providers: [FacturaService]
})
export class FacturasTableModule { }
