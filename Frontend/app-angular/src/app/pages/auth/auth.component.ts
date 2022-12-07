import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as formRoot from '../../store';
import * as fromUsuario from '../../store/usuario';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  usuario$ !: Observable<fromUsuario.UsuarioResponse>;
  isAuthorized$ !: Observable<boolean>

  constructor(
    private store: Store<formRoot.State>,
    private router: Router
  ){

  }

  ngOnInit(): void{
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
