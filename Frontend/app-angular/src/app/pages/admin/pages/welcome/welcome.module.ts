import { FormModule } from '@app/store/empresa/form/form.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { WelcomeHeaderModule } from './components/welcome-header/welcome-header.module';
import { ListModule } from '@app/store/empresa/list/list.module';
import { EmpresasTableModule } from '../../components/empresas-table/empresas-table.module';


@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    WelcomeHeaderModule,
    EmpresasTableModule,
    ListModule,
    FormModule
  ]
})
export class WelcomeModule { }
