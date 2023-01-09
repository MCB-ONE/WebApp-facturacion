import { Component, OnInit } from '@angular/core';
import { Empresa } from '@app/models/backend/empresa';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromActiveEmpresa from '@app/store/empresa/active/active.reducer';
import * as fromEmpresasList from '@app/store/empresa/list/list.reducer';
import { ActiveActions } from '@app/store/empresa/active/active.actions';
import { ListActions } from '@app/store/empresa/list/list.actions';
import { getActiveEmpresa, getLoading } from '@app/store/empresa/active/active.selectors';
import { getLoading as getListLoading, getEmpresas } from '@app/store/empresa/list/list.selectors';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  empresas$ !: Observable<Empresa[]>
  activeEmpresa$ !: Observable<Empresa | null>
  isActiveLoading$ !: Observable<boolean | null>;
  isListLoading$ !: Observable<boolean | null>;

  constructor(
    private storeActiveEmpresa: Store<fromActiveEmpresa.ActiveEmpresaState>,
    private storeEmpresasList: Store<fromEmpresasList.ListState>) { }

  ngOnInit(): void {

    this.isListLoading$ = this.storeEmpresasList.select(getListLoading);
    this.isActiveLoading$ = this.storeActiveEmpresa.select(getLoading);

    //Seleccionar empresas y seleccionar empresa activa incial
    this.storeEmpresasList.dispatch(ListActions.readAllStart());

    this.storeActiveEmpresa.dispatch(ActiveActions.readActiveStart());

    this.activeEmpresa$ = this.storeActiveEmpresa.select(getActiveEmpresa) as Observable<Empresa | null>
    this.empresas$ = this.storeEmpresasList.select(getEmpresas) as Observable<Empresa[]>
  }

  onEmpresaSelect(empresaId: number) {
    this.storeActiveEmpresa.dispatch(ActiveActions.changeActiveEmpresaStart({ empresaId }))
    //this.store.dispatch(EmpresaActions.readActiveStart())
  }

}
