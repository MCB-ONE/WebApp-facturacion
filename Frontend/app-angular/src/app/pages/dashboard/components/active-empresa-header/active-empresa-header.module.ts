import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveEmpresaHeaderComponent } from './active-empresa-header.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    ActiveEmpresaHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  exports: [
    ActiveEmpresaHeaderComponent
  ]
})
export class ActiveEmpresaHeaderModule { }
