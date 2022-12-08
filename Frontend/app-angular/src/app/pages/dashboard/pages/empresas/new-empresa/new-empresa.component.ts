import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '@app/store/app.state';
import { Observable } from 'rxjs';
import { markFormGroupTouched, regex, regexErrors } from '@app/shared/utils';
import { getLoading } from '@app/store/empresa/empresa.selectors';
import { EmpresaCreateRequest } from '@app/store/empresa/empresa.models';
import { EmpresaActions } from '@app/store/empresa/empresa.actions';

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
    private store: Store<fromRoot.AppState>,
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
      logo: [null]
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading$ = this.store.pipe(select(getLoading));
      const value = this.form.value;
      const empresa: EmpresaCreateRequest = {
        nombre: value.nombre,
        nif: value.nif,
        logo: value.logo
      }
      this.store.dispatch(EmpresaActions.createStart({ empresa: empresa }))
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
