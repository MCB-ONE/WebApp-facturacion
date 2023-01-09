import { SpinnerModule } from '@app/shared/indicators/spinner/spinner.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalLineasFacturaComponent } from './modal-lineas-factura.component';
import { MatTableModule } from '@angular/material/table';
import { PipesModule } from '@app/pipes/pipes.module';
import { LineasFacturaTableModule } from '../lineas-factura-table/lineas-factura-table.module';
import { LineaFacturaFormModule } from '../linea-factura-form/linea-factura-form.module';
import { LineafacturaService } from '../../services';



@NgModule({
  declarations: [
    ModalLineasFacturaComponent
  ],
  imports: [
    CommonModule,
    SpinnerModule,
    MatTableModule,
    MatIconModule,
    PipesModule,
    MatButtonModule,
    LineasFacturaTableModule,
    LineaFacturaFormModule
  ],
  providers: [ LineafacturaService ]
})
export class ModalLineasFacturaModule { }
