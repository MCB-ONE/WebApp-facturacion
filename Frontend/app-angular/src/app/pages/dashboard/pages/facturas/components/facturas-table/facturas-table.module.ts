import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { FacturasTableComponent } from './facturas-table.component';
import { DataPropertyGetterPipe } from './pipes/data-property-getter.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CamelCasePipe } from '@app/pipes/camel-case.pipe';


@NgModule({
  declarations: [
    FacturasTableComponent,
    DataPropertyGetterPipe,
    CamelCasePipe
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,
    MatMenuModule
  ],
  exports:[
    FacturasTableComponent
  ]
})
export class FacturasTableModule { }
