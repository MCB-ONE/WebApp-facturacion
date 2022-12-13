import { Factura } from '@app/models/backend/factura/index';
import { Pagination } from "./list.models";
import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { map, catchError, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { ListActions } from "./list.actions";

@Injectable()
export class ListEffects {

  readAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListActions.readAllStart),
      map((action) => action.empresaId),
      switchMap((request: number) =>
        this.httpClient.get<Factura[]>(`${environment.url}/api/Factura/empresa/${request}`)
          .pipe(
            map((list: any) =>
              ListActions.readAllSuccess({ list }),
            ),
            catchError(error => of(ListActions.readAllError({ error })))
          )
      )
    )
  );

  // readFACTURAS$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ListActions.readAllStart),
  //     mergeMap(() => this.httpClient.get<Pagination>(`${environment.url}/api/Empresa?${request}`)
  //       .pipe(

  //         map((list: any) =>
  //           ListActions.readAllSuccess({ list }),
  //         ),
  //         catchError(error => of(ListActions.readAllError({ error })))
  //       )
  //     )
  //   )
  // );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient
  ) { }

}
