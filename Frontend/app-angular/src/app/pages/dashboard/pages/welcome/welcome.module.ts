import { EmpresaListModule } from './../../components/empresa-list/empresa-list.module';
import { ActiveEmpresaHeaderModule } from './../../components/active-empresa-header/active-empresa-header.module';
import { SpinnerModule } from '@app/shared/indicators/spinner/spinner.module';
import { CounterCardModule } from '../../components/counter-card/counter-card.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { ListModule } from '@app/store/empresa/list/list.module';


@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    SpinnerModule,
    CounterCardModule,
    ActiveEmpresaHeaderModule,
    ListModule,
    EmpresaListModule

  ]
})
export class WelcomeModule { }
