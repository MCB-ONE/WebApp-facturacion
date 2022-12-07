import { Empresa } from './../../../models/backend/empresa/index';
import { ActiveActions } from './active.actions';
import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { map, catchError, switchMap, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { Router } from '@angular/router';

@Injectable()
export class ActiveEffects {

  readActive$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActiveActions.readActiveStart),
      switchMap(() =>
        this.httpClient.get<Empresa>(`${environment.url}/api/Empresa/activa`)
          .pipe(
            map((empresa: Empresa) => ActiveActions.readActiveSuccess({ empresa }),
            ),
            catchError(error => of(ActiveActions.readActiveError({ error })))
          )
      )
    )
  );

  changeActive$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActiveActions.changeActiveEmpresaStart),
      map((action) => action.empresaId),
      switchMap((id: string) =>
        this.httpClient.put<Empresa>(`${environment.url}/api/Empresa/activate/${id}`, null)
          .pipe(
            tap(() => {
              this.router.navigate(['/facturacion/welcome'])
            }),
            map((empresa: Empresa) => ActiveActions.changeActiveEmpresaSuccess({ empresa })
            ),
            catchError(error => of(ActiveActions.changeActiveEmpresaError({ error })))
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
