import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FacturaService } from '../../services/factura/factura.service';

@Component({
  selector: 'app-modal-factura-pdf',
  templateUrl: './modal-factura-pdf.component.html',
  styleUrls: ['./modal-factura-pdf.component.scss']
})
export class ModalFacturaPdfComponent implements OnInit {

  pdfUrl: string = '';

  constructor(public dialogRef: MatDialogRef<ModalFacturaPdfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private facturaService: FacturaService) { }

  ngOnInit(): void {
    this.pdfUrl = this.data;
  }

  onClose(): void {
    this.dialogRef.close();
  }
  onDownload(): void {
    let download: boolean = true;
    this.dialogRef.close(download);
  }

}
