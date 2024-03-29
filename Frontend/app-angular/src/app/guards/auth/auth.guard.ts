import { Injectable } from '@angular/core';
import { filter, map, tap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromRoot from '@app/store';
import * as fromUsuario from '@app/store/usuario';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private router: Router,
    private rootStore: Store<fromRoot.State>) {

  }


  // Método helper para chekear si el store de usuario contiene datos de un usuario logeado
  private check(): Observable<boolean> {
    return this.rootStore.pipe(select(fromUsuario.getUsuarioState)).pipe(
      filter(state => !state.loading),
      tap(state => {
        if (!state.id) {
          this.router.navigate(['auth/login']);
        }
      }),
      map(state => !!state.id)
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
