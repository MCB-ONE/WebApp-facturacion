import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ILineaFacturaItem } from '@app/models/frontend';
import { markFormGroupTouched, regex, regexErrors } from '@app/shared';
import { LineafacturaService } from '../../services/linea-factura/lineafactura.service';

@Component({
  selector: 'app-linea-factura-form',
  templateUrl: './linea-factura-form.component.html',
  styleUrls: ['./linea-factura-form.component.scss']
})
export class LineaFacturaFormComponent implements OnInit {

  form!: FormGroup;
  regexErrors = regexErrors;

  constructor(
    private fb: FormBuilder,
    //private store: Store<fromRoot.State>,
    private dialogRef: MatDialogRef<LineaFacturaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { value: ILineaFacturaItem },
    private lineaFacturaService: LineafacturaService
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      concepto: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
          Validators.maxLength(150)
        ]
      }
      ],
      precioUnitario: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
          Validators.maxLength(5),
          Validators.pattern(regex.decimal)
        ]
      }
      ],
      cantidad: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
          Validators.maxLength(5),
          Validators.pattern(regex.number)
        ]
      }
      ]
    });

    if(this.data && this.data.value){
      this.form.patchValue(this.data.value);
    }
  }

  onSubmit(): void {

    if (this.form.valid) {
      if (this.data && this.data.value) {
        const updateLinea = { ...this.data.value, ...this.form.value };
        this.lineaFacturaService.updateLinea(updateLinea);
      } else {
        this.form.value.cantidad = Number(this.form.value.cantidad);
        this.lineaFacturaService.addLinea(this.form.value);
      }
      this.dialogRef.close();
    } else {
      markFormGroupTouched(this.form);
    }

  }



}
