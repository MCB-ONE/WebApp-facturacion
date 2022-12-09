import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsModule, FormFieldModule, IndicatorsModule, InputModule, SpinnerModule, UserPhotoModule } from '@app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { UpdateEmpresaRoutingModule } from './update-empresa-routing.module';
import { UpdateEmpresaComponent } from './update-empresa.component';
import { MapperService } from '../../service';
import { FormModule } from '@app/store/empresa/form/form.module';


@NgModule({
  declarations: [
    UpdateEmpresaComponent
  ],
  imports: [
    CommonModule,
    UpdateEmpresaRoutingModule,
    ReactiveFormsModule,
    FormModule,
    MatButtonModule,
    ControlsModule,
    IndicatorsModule,
    FormFieldModule,
    InputModule,
    UserPhotoModule,
    SpinnerModule
  ],
  providers:[
    MapperService
  ]
})
export class UpdateEmpresaModule { }
