import { Injectable } from '@angular/core';
import { filter, map, tap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromRoot from '@app/store'
import * as fromUsuario from '@app/store/usuario'


@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private rootStore: Store<fromRoot.State>) {

  }


  // Método helper para chekear si el store de usuario contiene datos de un usuario logeado
  private check(): Observable<boolean> {
    return this.rootStore.pipe(select(fromUsuario.getUsuarioState)).pipe(
      filter(state => !state.loading),
      tap(state => {
        if (state.id) {
          this.router.navigate(['facturacion/inicio']);
        }
      }),
      map(state => !state.id)
    )
  }


  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.check();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.check();
  }

  canLoad(route: Route, segment: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.check();
  }

}
