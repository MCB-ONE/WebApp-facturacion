import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { map, catchError, exhaustMap, delay, tap, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { FormActions } from './form.actions';
import { Router } from '@angular/router';
import { Factura } from "@app/models/backend/factura";
import { NotificationService } from "@app/services";

@Injectable()
export class FormEffects {
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FormActions.createStart),
      exhaustMap(action =>
        this.httpClient.post<Factura>(`${environment.url}/api/Factura`, action.factura)
          .pipe(
            tap((factura: Factura) => {
              this.router.navigate(['/facturacion/inicio'])
            }),
            map((factura: Factura) => FormActions.createSuccess({ factura }),
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
        this.httpClient.put<Factura>(`${environment.url}/api/Factura/actualizar/${action.facturaId}`, action.factura)
          .pipe(
            tap((factura: Factura) => {
              this.router.navigate(['/facturacion/inicio'])
            }),
            map((factura: Factura) => FormActions.updateSuccess({ factura }),
            ),
            catchError(error => of(FormActions.updateError({ error })))
          )
      )
    )
  );

  updateLineas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FormActions.updateLineasStart),
      exhaustMap(action =>
        this.httpClient.put<Factura>(`${environment.url}/api/Factura/lineas/${action.facturaId}`, action.lineasFactura)
          .pipe(
            tap((factura: Factura) => {
              this.notificationService.success(`Líneas de la factura numero ${factura.numero} actualizadas.`)
              this.router.navigate(['/facturacion/inicio'])
            }),
            map((factura: Factura) => FormActions.updateLineasSuccess({ factura }),
            ),
            catchError(error => of(FormActions.updateLineasError({ error })))
          )
      )
    )
  );

  read$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FormActions.readStart),
      map((action) => action.facturaId),
      switchMap((id: string) =>
        this.httpClient.get<Factura>(`${environment.url}/api/Factura/${id}`)
          .pipe(
            map((factura: Factura) => FormActions.readSuccess({ factura })
            ),
            catchError(error => of(FormActions.readError({ error })))
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) { }

}
