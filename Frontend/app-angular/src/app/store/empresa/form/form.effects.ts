import { Empresa } from '@app/models/backend/empresa/index';
import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { map, catchError, exhaustMap, delay, tap, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { FormActions } from './form.actions';
import { Router } from '@angular/router';

@Injectable()
export class ListEffects {
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FormActions.createStart),
      exhaustMap(action =>
        this.httpClient.post<Empresa>(`${environment.url}/api/Empresa`, action.empresa)
          .pipe(
            tap((empresa: Empresa) => {
              this.router.navigate(['/facturacion/empresa'])
            }),
            map((empresa: Empresa) => FormActions.createSuccess({ empresa }),
            ),
            catchError(error => of(FormActions.createError({ error })))
          )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FormActions.updateStart),
      delay(3000),
      exhaustMap(action =>
        this.httpClient.put<Empresa>(`${environment.url}/api/Empresa/actualizar/${action.empresaId}`, action.empresa)
          .pipe(
            tap((empresa: Empresa) => {
              this.router.navigate(['/facturacion/welcome'])
            }),
            map((empresa: Empresa) => FormActions.updateSuccess({ empresa }),
            ),
            catchError(error => of(FormActions.updateError({ error })))
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router
  ) { }

}
