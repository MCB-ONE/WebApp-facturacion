import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as fromEmpresaForm from '@app/store/empresa/form/form.reducer';

import { Observable } from 'rxjs';
import { markFormGroupTouched, regex, regexErrors } from '@app/shared/utils';
import { getEmpresa, getForm, getLoading } from '@app/store/empresa/form/from.selectors';
import { EmpresaUpdateRequest } from '@app/store/empresa/form/form.models';
import { FormActions } from '@app/store/empresa/form/form.actions';
import { ActivatedRoute, Params } from '@angular/router';
import { MapperService } from '../../service';


export interface EmpresaForm {
  id: string | null;
  emailUsuario: string | null;
  nombre: string | null;
  nif: string | null;
  logo: string | null;
}

@Component({
  selector: 'app-update-empresa',
  templateUrl: './update-empresa.component.html',
  styleUrls: ['./update-empresa.component.scss']
})
export class UpdateEmpresaComponent implements OnInit {

  loading$ !: Observable<boolean | null>
  form !: FormGroup;
  regexErrors = regexErrors;


  constructor(
    private store: Store<fromEmpresaForm.EmpresaFormState>,
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private mapperService: MapperService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
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
    })

    this.store.pipe(select(getEmpresa))
      .subscribe(empresa => {
        if (empresa) {
          const form = this.mapperService.empresaToForm(empresa);
          console.log(empresa);
          this.store.dispatch(FormActions.formSet({ form: form }));
        }
      })

    this.store.pipe(select(getForm))
      .subscribe(empresaForm => {
        if (empresaForm.nombre) {
          const value = empresaForm;
          this.form.patchValue(value);
          this.form.updateValueAndValidity();
          this.cdr.detectChanges();
        }
      })

    this.router.params.subscribe((param: Params) => {
      const id: string = param["id"];
      this.store.dispatch(FormActions.readStart({ empresaId: id }));
    })

  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading$ = this.store.pipe(select(getLoading));

      this.router.params.subscribe((param: Params) => {

        const value = this.form.value;

        const empresa: EmpresaUpdateRequest = {
          id: param["id"],
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
        }

        const id = param["id"];

        this.store.dispatch(FormActions.updateStart({
          empresaId: id,
          empresa: empresa
        }))

      })

    } else {
      markFormGroupTouched(this.form);
    }
  }

  onFilesChanged(url: any): void {
    if (url) {
      this.form.controls['logo'].setValue(url);
    }
  }
}
