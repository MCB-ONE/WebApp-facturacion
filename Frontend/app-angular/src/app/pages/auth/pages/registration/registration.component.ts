import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { markFormGroupTouched, regex, regexErrors } from '@app/shared/utils';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '@app/store';
import * as fromUsuario from '@app/store/usuario';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {
  form!: FormGroup;
  regexError = regexErrors;
  loading$!: Observable<boolean | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(fromUsuario.getLoading));
    this.form = this.fb.group(
      {
        email: [null, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.maxLength(128),
            Validators.pattern(regex.email)
          ]
        }],
        userName: [null, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3),
          ]
        }],
        nombre: [null, {
          updateOn: 'blur',
          validators: [
            Validators.required
          ]
        }],
        apellido: [null, {
          updateOn: 'blur',
          validators: [
            Validators.required
          ]
        }],
        password: [null, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
            Validators.pattern(regex.password)
          ]
        }],
        passwordRepeat: [null, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
            Validators.pattern(regex.password)
          ]
        }]
      },{validator: this.repeatPasswordValidator})
  }

  private repeatPasswordValidator(group: FormGroup): {[key: string]:boolean} | null {
    const password = group.get('password');
    const passwordRepeat = group.get('passwordRepeat');

    return passwordRepeat?.value && password?.value !== passwordRepeat.value
      ? {repeat: true }
      : null;
  }

  onSubmit(): void{
    if(this.form.valid){
      const value = this.form.value;
      console.log("Enviado");
      const usuarioCreateRequest: fromUsuario.UsuarioCreateRequest = {
        email: value.email,
        password: value.password,
        userName: value.userName,
        nombre: value.nombre,
        apellido: value.apellido
      };

      this.store.dispatch(new fromUsuario.SignUpEmail(usuarioCreateRequest));
    }else{
      markFormGroupTouched(this.form);
    }
  }

}
