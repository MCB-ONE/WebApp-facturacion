import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturasRoutingModule } from './facturas-routing.module';
import { FacturasComponent } from './facturas.component';
import { ListModule } from '@app/store/factura/list/list.module';
import { FacturasTableModule } from './components/facturas-table/facturas-table.module';


@NgModule({
  declarations: [
    FacturasComponent
  ],
  imports: [
    CommonModule,
    FacturasRoutingModule,
    ListModule,
    FacturasTableModule
  ]
})
export class FacturasModule { }
