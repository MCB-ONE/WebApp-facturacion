import { MatButtonModule } from '@angular/material/button';
import { EmpresasTableModule } from './components/empresas-table/empresas-table.module';
import { ActiveEmpresaHeaderModule } from './../../components/active-empresa-header/active-empresa-header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresasRoutingModule } from './empresas-routing.module';
import { EmpresasComponent } from './empresas.component';
import { ListModule } from '@app/store/empresa/list/list.module';


@NgModule({
  declarations: [
    EmpresasComponent
  ],
  imports: [
    CommonModule,
    EmpresasRoutingModule,
    ListModule,
    ActiveEmpresaHeaderModule,
    EmpresasTableModule,
    MatButtonModule
  ]
})
export class EmpresasModule { }
