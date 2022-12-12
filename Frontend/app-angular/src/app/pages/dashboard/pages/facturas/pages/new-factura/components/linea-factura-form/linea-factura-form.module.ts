import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineaFacturaFormComponent } from './linea-factura-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldModule, InputModule } from '@app/shared';



@NgModule({
  declarations: [
    LineaFacturaFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputModule,
    FormFieldModule,
    MatButtonModule
  ]
})
export class LineaFacturaFormModule { }
