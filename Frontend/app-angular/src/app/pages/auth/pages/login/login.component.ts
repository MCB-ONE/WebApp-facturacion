import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { markFormGroupTouched, regex, regexErrors } from '@app/shared/utils';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '@app/store';
import * as fromUsuario from '@app/store/usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
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
        password: [null, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
            Validators.pattern(regex.password)
          ]
        }]
      })
  }

  onSubmit(): void{
    if(this.form.valid){
      const value = this.form.value;
      console.log("Enviado");
      const emailPasswordCredentials: fromUsuario.EmailPasswordCredentials = {
        email: value.email,
        password: value.password
      };

      this.store.dispatch(new fromUsuario.SignInEmail(emailPasswordCredentials));
    }else{
      markFormGroupTouched(this.form);
    }
  }
}
