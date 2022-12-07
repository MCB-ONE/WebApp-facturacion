import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturasRoutingModule } from './facturas-routing.module';
import { FacturasComponent } from './facturas.component';


@NgModule({
  declarations: [
    FacturasComponent
  ],
  imports: [
    CommonModule,
    FacturasRoutingModule
  ]
})
export class FacturasModule { }
