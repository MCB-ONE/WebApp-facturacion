import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturasRoutingModule } from './facturas-routing.module';
import { FacturasComponent } from './facturas.component';
import { ActiveEmpresaHeaderModule } from '../../components/active-empresa-header/active-empresa-header.module';
import { ListModule } from '@app/store/empresa/list/list.module';
import { FacturasTableModule } from './components/facturas-table/facturas-table.module';
import { MatButtonModule } from '@angular/material/button';


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
