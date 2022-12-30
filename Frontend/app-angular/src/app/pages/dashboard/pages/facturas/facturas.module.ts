import { MatButtonModule } from '@angular/material/button';
import { ActiveEmpresaHeaderModule } from './../../components/active-empresa-header/active-empresa-header.module';
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
    FacturasTableModule,
    ActiveEmpresaHeaderModule,
    MatButtonModule
  ]
})
export class FacturasModule { }
