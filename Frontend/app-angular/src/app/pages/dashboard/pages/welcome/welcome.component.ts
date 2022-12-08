import { Component, OnInit } from '@angular/core';
import { Empresa } from '@app/models/backend/empresa';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Pagination } from '@app/store/empresa/list/list.models';
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
  params = new HttpParams();
  pagination$ !: Observable<Pagination>
  activeEmpresa$ !: Observable<Empresa | null>
  isActiveLoading$ !: Observable<boolean | null>;
  isListLoading$ !: Observable<boolean | null>;

  constructor(
    private storeActiveEmpresa: Store<fromActiveEmpresa.ActiveEmpresaState>,
    private storeEmpresasList: Store<fromEmpresasList.ListState>) { }

  ngOnInit(): void {

    this.isListLoading$ = this.storeEmpresasList.select(getListLoading);
    this.isActiveLoading$ = this.storeActiveEmpresa.select(getLoading);
    this.activeEmpresa$ = this.storeActiveEmpresa.select(getActiveEmpresa) as Observable<Empresa | null>

    //Seleccionar empresas y seleccionar empresa activa incial
    this.params = this.params.set('pageIndex', 1);
    this.params = this.params.set('pageSize', 3);
    this.params = this.params.set('sort', 'idDesc');

    this.storeEmpresasList.dispatch(ListActions.readAllStart({
      requestPagination: this.params,
      paramsUrl: this.params.toString()
    }))

    this.storeActiveEmpresa.dispatch(ActiveActions.readActiveStart());

    this.activeEmpresa$ = this.storeActiveEmpresa.select(getActiveEmpresa) as Observable<Empresa | null>
    this.pagination$ = this.storeEmpresasList.select(getEmpresas) as Observable<Pagination>
  }

  onEmpresaSelect(empresaId: number) {
    this.storeActiveEmpresa.dispatch(ActiveActions.changeActiveEmpresaStart({ empresaId }))
    //this.store.dispatch(EmpresaActions.readActiveStart())
  }

}
