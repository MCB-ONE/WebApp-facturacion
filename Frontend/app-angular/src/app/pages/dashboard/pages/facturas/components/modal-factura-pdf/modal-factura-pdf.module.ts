import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFacturaPdfComponent } from './modal-factura-pdf.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';



@NgModule({
  declarations: [
    ModalFacturaPdfComponent
  ],
  imports: [
    CommonModule,
    NgxExtendedPdfViewerModule,
    MatDialogModule,
    MatButtonModule
  ],exports: [ModalFacturaPdfComponent]
})
export class ModalFacturaPdfModule { }
