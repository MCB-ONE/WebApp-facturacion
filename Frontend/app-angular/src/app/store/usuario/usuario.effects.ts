import { Injectable } from "@angular/core";
import { UsuarioResponse } from './usuario.models';
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
//import { Dictionary, Dictionaries, IItem, IControlItem } from "./dictionaries.models";
import * as fromActions from './usuario.actions';
import { Observable, of, zip } from "rxjs";
import { map, switchMap, catchError, take, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { NotificationService } from "@app/services";
import { environment } from "environments/environment";

type Action = fromActions.All;

@Injectable()
export class UsuarioEffects {

  constructor(
    private actions$: Actions,
    private router: Router,
    private httpClient: HttpClient,
    private notification: NotificationService
  ) { }

  signUpEmail$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.Types.SINGIN_UP_EMAIL),
      map((action: fromActions.SignUpEmail) => action.usuario),
      switchMap(usuarioData =>
        this.httpClient.post<UsuarioResponse>(`${environment.url}/api/Usuario/registrar`, usuarioData)
          .pipe(
            tap({
              next: (response: UsuarioResponse) => {
                localStorage.setItem('token', response.token);
                this.router.navigate(['/facturacion']);
              }
            }),
            map((response: UsuarioResponse) => new fromActions.SignUpEmailSuccess(response.id, response || null)),
            catchError(err => {
              this.notification.error("Error al registrar usuario");
              return of(new fromActions.SignUpEmailError(err.message))
            })
          )
      )
    )
  );

  signInEmail$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.Types.SINGIN_IN_EMAIL),
      map((action: fromActions.SignInEmail) => action.credentials),
      switchMap(credentials =>
        this.httpClient.post<UsuarioResponse>(`${environment.url}/api/Usuario/login`, credentials)
          .pipe(
            tap({
              next: (response: UsuarioResponse) => {
                localStorage.setItem('token', response.token);
                this.router.navigate(['/facturacion']);
              }
            }),
            map((response: UsuarioResponse) => new fromActions.SignInEmailSuccess(response.id, response || null)),
            //catchError(err => of(new fromActions.SignInEmailError(err.message)))
            catchError(err => {
              this.notification.error("Credenciales incorrectas");
              return of(new fromActions.SignInEmailError(err.message))
            })
          )
      )
    )
  );


  init$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.Types.INIT),
      switchMap(async () => localStorage.getItem('token')),
      switchMap(token => {
        if (token) {
          return this.httpClient.get<UsuarioResponse>(`${environment.url}/api/Usuario`)
            .pipe(
              tap({
                next: (user: UsuarioResponse) => {
                  console.log("Data usuario en sesión que llega desde el servidor => ", user);
                  this.router.navigate(['/facturacion']);
                }
              }),
              map((user: UsuarioResponse) => new fromActions.InitAuthorized(user.id, user || null)),
              catchError(err => of(new fromActions.InitError(err.message)))
            )
        } else {
          return of(new fromActions.InitUnauthorized());
        }
      }
      )
    )
  );
}
