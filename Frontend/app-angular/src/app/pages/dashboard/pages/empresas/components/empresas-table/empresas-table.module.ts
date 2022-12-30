import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { PipesModule } from '@app/pipes/pipes.module';
import { EmpresasTableComponent } from './empresas-table.component';



@NgModule({
  declarations: [
    EmpresasTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    PipesModule
  ],
  exports:[
    EmpresasTableComponent
  ]
})
export class EmpresasTableModule { }
