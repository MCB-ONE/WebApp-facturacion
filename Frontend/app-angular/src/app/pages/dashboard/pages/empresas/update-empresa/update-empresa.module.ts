import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsModule, FormFieldModule, IndicatorsModule, InputModule, PopupsModule, SpinnerModule, UserPhotoModule } from '@app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { UpdateEmpresaRoutingModule } from './update-empresa-routing.module';
import { UpdateEmpresaComponent } from './update-empresa.component';
import { MapperService } from '../../service';


@NgModule({
  declarations: [
    UpdateEmpresaComponent
  ],
  imports: [
    CommonModule,
    UpdateEmpresaRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    ControlsModule,
    IndicatorsModule,
    PopupsModule,
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
