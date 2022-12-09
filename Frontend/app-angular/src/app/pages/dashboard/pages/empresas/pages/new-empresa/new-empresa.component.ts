import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as fromEmpresaForm from '@app/store/empresa/form/form.reducer';
import { Observable } from 'rxjs';
import { markFormGroupTouched, regex, regexErrors } from '@app/shared/utils';
import { getLoading } from '@app/store/empresa/form/from.selectors';
import { EmpresaCreateRequest } from '@app/store/empresa/form/form.models';
import { FormActions } from '@app/store/empresa/form/form.actions';

@Component({
  selector: 'app-new-empresa',
  templateUrl: './new-empresa.component.html',
  styleUrls: ['./new-empresa.component.scss']
})
export class NewEmpresaComponent implements OnInit {
  loading$ !: Observable<boolean | null>
  form !: FormGroup;
  regexErrors = regexErrors;


  constructor(
    private store: Store<fromEmpresaForm.EmpresaFormState>,
    private fb: FormBuilder
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
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading$ = this.store.pipe(select(getLoading));
      const value = this.form.value;
      const empresa: EmpresaCreateRequest = {
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
      this.store.dispatch(FormActions.createStart({ empresa: empresa }))
    }else{
      markFormGroupTouched(this.form);
    }
  }

  onFilesChanged(url: any): void {
    if(url){
      this.form.controls['logo'].setValue(url);
    }
  }

}
