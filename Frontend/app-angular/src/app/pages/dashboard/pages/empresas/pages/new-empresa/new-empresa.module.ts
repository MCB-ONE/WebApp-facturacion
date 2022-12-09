import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewEmpresaRoutingModule } from './new-empresa-routing.module';
import { NewEmpresaComponent } from './new-empresa.component';
import { ControlsModule, FormFieldModule, IndicatorsModule, InputModule, SpinnerModule, UserPhotoModule } from '@app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FormModule } from '@app/store/empresa/form/form.module';


@NgModule({
  declarations: [
    NewEmpresaComponent
  ],
  imports: [
    CommonModule,
    NewEmpresaRoutingModule,
    ReactiveFormsModule,
    FormModule,
    MatButtonModule,
    ControlsModule,
    IndicatorsModule,
    FormFieldModule,
    InputModule,
    UserPhotoModule,
    SpinnerModule
  ]
})
export class NewEmpresaModule { }
