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
      map((action) => action.paramsUrl),
      switchMap((request: string) =>
        this.httpClient.get<Pagination>(`${environment.url}/api/Empresa?${request}`)
          .pipe(
            map((pagination: any) =>
            ListActions.readAllSuccess({ pagination }),
            ),
            catchError(error => of(ListActions.readAllError({ error })))
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient
  ) { }

}
