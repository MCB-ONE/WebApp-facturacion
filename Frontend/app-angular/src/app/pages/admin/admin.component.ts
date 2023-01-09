import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '@app/store';
import * as fromUsuario from '@app/store/usuario';
import { menuItem } from './components/menu-list/menu-list.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  // Inicializar items menu sidenav
  menuItems: menuItem[] = [
    { name: 'inicio', icon: 'assessment' },
    { name: 'empresas', icon: 'business' },
    { name: 'facturas', icon: 'list_alt' },
  ];

  usuario$ !: Observable<fromUsuario.UsuarioResponse>;
  isAuthorized$ !: Observable<boolean>

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
