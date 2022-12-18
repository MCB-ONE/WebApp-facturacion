import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineasFacturaTableComponent } from './lineas-factura-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { PipesModule } from '@app/pipes/pipes.module';



@NgModule({
  declarations: [
    LineasFacturaTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    PipesModule
  ],
  exports: [
    LineasFacturaTableComponent
  ]
})
export class LineasFacturaTableModule { }
