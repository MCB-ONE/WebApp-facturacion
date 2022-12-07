import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../store';
import * as fromUsuario from '../../store/usuario';
import { HttpParams } from '@angular/common/http';
import { menuItem } from './components/menu-list/menu-list.component';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Inicializar items menu sidenav
  menuItems: menuItem[] = [
    { name: 'inicio', icon: 'assessment' },
    { name: 'empresas', icon: 'business' },
    { name: 'facturas', icon: 'list_alt' },
  ];

  usuario$ !: Observable<fromUsuario.UsuarioResponse>;
  isAuthorized$ !: Observable<boolean>
  empresasLoading$ !: Observable<boolean | null>;
  params = new HttpParams();

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.usuario$ = this.store.pipe(select(fromUsuario.getUsuario)) as Observable<fromUsuario.UsuarioResponse>
    this.isAuthorized$ = this.store.pipe(select(fromUsuario.getIsAuthorized)) as Observable<boolean>
    this.store.dispatch(new fromUsuario.Init());
  }

  onSignOut(): void {
    localStorage.removeItem('token');
    this.store.dispatch(new fromUsuario.SignOut());
    this.router.navigate(['/auth/login']);
  }

}
