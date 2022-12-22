import { LineasFacturaTableModule } from './../../components/lineas-factura-table/lineas-factura-table.module';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineafacturaService } from '../../services';
import { NewFacturaRoutingModule } from './new-factura-routing.module';
import { NewFacturaComponent } from './new-factura.component';
import { ControlsModule, DateModule, FormFieldModule, IndicatorsModule, InputModule, SpinnerModule, UserPhotoModule } from '@app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { LineaFacturaFormModule } from './components/linea-factura-form/linea-factura-form.module';
import { FacturaSummaryComponent } from './components/components/factura-summary/factura-summary.component';
import { MatDividerModule } from '@angular/material/divider';
import { FormModule } from '@app/store/factura/form/form.module';

@NgModule({
  declarations: [
    NewFacturaComponent,
    FacturaSummaryComponent
  ],
  imports: [
    CommonModule,
    NewFacturaRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    ControlsModule,
    DateModule,
    IndicatorsModule,
    FormFieldModule,
    InputModule,
    UserPhotoModule,
    SpinnerModule,
    MatDialogModule,
    LineaFacturaFormModule,
    FormModule,
    LineasFacturaTableModule
  ],
  providers: [LineafacturaService],
})
export class NewFacturaModule { }
