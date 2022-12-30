import { Component, OnInit } from '@angular/core';
import * as fromActiveEmpresa from '@app/store/empresa/active/active.reducer';
import * as fromEmpresasList from '@app/store/empresa/list/list.reducer';
import { Store } from '@ngrx/store';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagination } from '@app/store/empresa/list/list.models';
import { Empresa } from '@app/models/backend';
import { getLoading as getListLoading, getEmpresas, getLoading } from '@app/store/empresa/list/list.selectors';
import { getActiveEmpresa } from '@app/store/empresa/active/active.selectors';
import { ActiveActions } from '@app/store/empresa/active/active.actions';


@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {

  params = new HttpParams();
  pagination$ !: Observable<Pagination>
  activeEmpresa$ !: Observable<Empresa | null>
  isActiveLoading$ !: Observable<boolean | null>;
  isListLoading$ !: Observable<boolean | null>;


  constructor(
    private storeActiveEmpresa: Store<fromActiveEmpresa.ActiveEmpresaState>,
    private storeEmpresasList: Store<fromEmpresasList.ListState>) { }

  ngOnInit(): void {
    this.activeEmpresa$ = this.storeActiveEmpresa.select(getActiveEmpresa) as Observable<Empresa | null>
    this.pagination$ = this.storeEmpresasList.select(getEmpresas) as Observable<Pagination>
  }

  onEmpresaSelect(empresaId: number) {
    this.storeActiveEmpresa.dispatch(ActiveActions.changeActiveEmpresaStart({ empresaId }))
    //this.store.dispatch(EmpresaActions.readActiveStart())
  }

}
