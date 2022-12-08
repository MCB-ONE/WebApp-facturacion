import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '@app/store/app.state';
import { Observable } from 'rxjs';
import { markFormGroupTouched, regex, regexErrors } from '@app/shared/utils';
import { getEmpresa, getFormState, getLoading } from '@app/store/empresa/empresa.selectors';
import { EmpresaUpdateRequest } from '@app/store/empresa/empresa.models';
import { EmpresaActions } from '@app/store/empresa/empresa.actions';
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
    private store: Store<fromRoot.AppState>,
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private mapperService: MapperService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      emailUsuario: [null],
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
      logo: [null]
    })

    this.store.pipe(select(getFormState))
      .subscribe(empresaForm => {
        if (empresaForm.nombre) {
          const value = empresaForm;
          this.form.patchValue(value);
          this.form.updateValueAndValidity();
          this.cdr.detectChanges();
        }
      })

    this.store.pipe(select(getEmpresa))
      .subscribe(empresa => {
        if (empresa) {
          const form = this.mapperService.empresaToForm(empresa);
          console.log(empresa);
          this.store.dispatch(EmpresaActions.formSet({ form: form }));
        }
      })

    this.router.params.subscribe((param: Params) => {
      const id: string = param["id"];
      this.store.dispatch(EmpresaActions.readStart({ empresaId: id }));
    })

  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading$ = this.store.pipe(select(getLoading));

      this.router.params.subscribe((param: Params) => {

        const value = this.form.value;

        const empresa: EmpresaUpdateRequest = {
          id: param["id"],
          emailUsuario: value.emailUsuario,
          nombre: value.nombre,
          nif: value.nif,
          logo: value.logo,
        }

        const id = param["id"];

        this.store.dispatch(EmpresaActions.updateStart({
          empresaId: id,
          empresa: empresa }))

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
