import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewEmpresaRoutingModule } from './new-empresa-routing.module';
import { NewEmpresaComponent } from './new-empresa.component';
import { ControlsModule, FormFieldModule, IndicatorsModule, InputModule, PopupsModule, SpinnerModule, UserPhotoModule } from '@app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    NewEmpresaComponent
  ],
  imports: [
    CommonModule,
    NewEmpresaRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    ControlsModule,
    IndicatorsModule,
    PopupsModule,
    FormFieldModule,
    InputModule,
    UserPhotoModule,
    SpinnerModule
  ]
})
export class NewEmpresaModule { }
