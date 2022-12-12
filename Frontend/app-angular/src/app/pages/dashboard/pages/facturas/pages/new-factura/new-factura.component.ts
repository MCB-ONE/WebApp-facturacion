import { FacturaCreateRequest } from '@app/store/factura/form/form.models';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { markFormGroupTouched, regex, regexErrors } from '@app/shared';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromActiveEmpresa from '@app/store/empresa/active/active.reducer';
import { getActiveEmpresa } from '@app/store/empresa/active/active.selectors';
import { IControlItem, ILineaFacturaItem } from '@app/models/frontend';
import { Empresa } from '@app/models/backend';
import { getLoading } from '@app/store/factura/form/from.selectors';
import { LineaFacturaFormComponent } from './components/linea-factura-form/linea-factura-form.component';
import { MatDialog } from '@angular/material/dialog';
import { LineafacturaService } from './services/linea-factura/lineafactura.service';
import { LineaFactura } from '@app/models/backend/lineaFactura';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-factura',
  templateUrl: './new-factura.component.html',
  styleUrls: ['./new-factura.component.scss']
})
export class NewFacturaComponent implements OnInit {

  isLoaded: boolean = false;
  form !: FormGroup;
  regexErrors = regexErrors;
  activeEmpresa$!: Observable<Empresa | null>
  empresaId!: number;
  facturasCount!: number;
  ivaOptions!: IControlItem[];
  empresaDirecciones: IControlItem[] = [];
  lineasFactura!: ILineaFacturaItem[];
  facturaPreview!: FacturaCreateRequest;
  iva: number = 21;


  constructor(
    private store: Store<fromActiveEmpresa.ActiveEmpresaState>,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private datepipe: DatePipe,
    private lineaFacturaService: LineafacturaService,
  ) {
    this.ivaOptions = [
      { label: '4%', value: 4 },
      { label: '10%', value: 10 },
      { label: '21%', value: 21 },
    ]
  }

  ngOnInit(): void {
    this.activeEmpresa$ = this.store.select(getActiveEmpresa) as Observable<Empresa | null>
    this.activeEmpresa$.subscribe((data) => {
      if (data?.id) {
        this.isLoaded = true;
        this.empresaId = data.id;
        this.facturasCount = data.facturas.length + 1;
      }
    })

    this.lineasFactura = this.lineaFacturaService.getLineas();
    this.lineaFacturaService.lineasFacturaUpdated.subscribe((data) => {
      this.lineasFactura = data;
    });

    this.form = this.fb.group({
      fechaExpedicion: [this.datepipe.transform(Date.now(), 'dd/MM/YYYY'), {
        updateOn: 'blur'
      }],
      numeroFactura: [this.facturasCount],
      iva: [21, {
        updateOn: 'blur'
      }],
      direccionEmpresaId: [null, {
        updateOn: 'blur'
      }],

      //Datos cliente
      nombre: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(256)
        ]
      }],
      nif: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),
          Validators.pattern(regex.nif)
        ]
      }],
      logo: [null],
      calle: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      }],
      numero: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(3),
          Validators.pattern(regex.number)
        ]
      }],
      codigoPostal: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5)
        ]
      }],
      ciudad: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ]
      }],
      provincia: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ]
      }],
      pais: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ]
      }],
      telefono: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
          Validators.pattern(regex.phone)
        ]
      }],
      email: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
          Validators.pattern(regex.email)
        ]
      }],
      //lineasFactura: this.fb.array([])
    })
  }


  // Crud líneas factura
  onAddLineaFactura(): void {
    this.dialog.open(LineaFacturaFormComponent, {
      width: '650px',
      height: 'fit-content',
      data: null
    });
  }

  onEditLineaFactura(value: LineaFactura): void {
    this.dialog.open(LineaFacturaFormComponent, {
      width: '650px',
      height: 'fit-content',
      data: { value }
    });
  }

  onDeleteLineaFactura(linea: ILineaFacturaItem): void {
    this.lineaFacturaService.deleteLinea(linea);
    //this.lineaFacturaService.getLineas();
  }

  ivaChanged(event: any) {
    this.iva = parseInt(event);
  }

  onPreviw(): void {
    if (this.form.valid) {
      const value = this.form.value;
      const factura: FacturaCreateRequest = {
        fechaExpedicion: value.fechaExpedicion,
        iva: value.iva,
        numero: value.numeroFactura,
        empresaId: this.empresaId,
        subtotal: value.subtotal,
        cliente: {
          nombre: value.nombre,
          nif: value.nif,
          logo: value.logo,
          calle: value.calle,
          numero: value.numero,
          codigoPostal: value.codigoPostal,
          ciudad: value.ciudad,
          provincia: value.provincia,
          pais: value.pais,
          telefono: value.telefono,
          email: value.email
        },
        lineasFactura: this.lineasFactura
      }
      this.facturaPreview = factura;
      // this.store.dispatch(DireccionActions.createStart({ direccion: direccion }))
      //
    } else {
      markFormGroupTouched(this.form);
    }
  }


}
