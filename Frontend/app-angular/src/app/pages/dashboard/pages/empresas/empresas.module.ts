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
    ListModule
  ]
})
export class EmpresasModule { }
