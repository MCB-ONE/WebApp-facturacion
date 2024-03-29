import { FacturaCreateRequest } from '@app/store/factura/form/form.models';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { markFormGroupTouched, regex, regexErrors } from '@app/shared';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as fromActiveEmpresa from '@app/store/empresa/active/active.reducer';
import { getActiveEmpresa } from '@app/store/empresa/active/active.selectors';
import { IControlItem, ILineaFacturaItem } from '@app/models/frontend';
import { Empresa } from '@app/models/backend';
import { LineaFacturaFormComponent } from './components/linea-factura-form/linea-factura-form.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { FormActions } from '@app/store/factura/form/form.actions';
import {NotificationService} from '@app/services';
import { LineafacturaService } from '../../services';

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
  lineasFactura!: ILineaFacturaItem[];
  iva: number = 21;

  private serviceSubscribe!: Subscription;


  constructor(
    private store: Store<fromActiveEmpresa.ActiveEmpresaState>,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private datepipe: DatePipe,
    private lineaFacturaService: LineafacturaService,
    private notification: NotificationService
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

    this.lineaFacturaService.getAll();
    this.serviceSubscribe = this.lineaFacturaService.lineasFactura$.subscribe(res => {
      this.lineasFactura = res;
    })


    this.form = this.fb.group({
      fechaExpedicion: [this.datepipe.transform(Date.now(), 'yyyy-MM-dd'), {
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
      }]
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

  ivaChanged(event: any) {
    this.iva = parseInt(event);
  }

  lineasError() {
    this.notification.error("Ha de incluir como mínimo una línea de factura")
  }

  onSubmit(): void {
    if (this.form.valid) {
      const value = this.form.value;
      const fechaFormated = this.datepipe.transform(value.fechaExpedicion, 'yyyy-MM-dd')!;

      const factura: FacturaCreateRequest = {
        fechaExpedicion: fechaFormated,
        iva: value.iva,
        empresaId: this.empresaId,
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

      if(this.lineasFactura.length == 0){
        this.lineasError();
      }

      this.store.dispatch(FormActions.createStart({ factura: factura }))
    } else {
      markFormGroupTouched(this.form);
    }
  }


  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }
}
