import { Component, OnInit } from '@angular/core';
import { Empresa } from '@app/models/backend';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromEmpresasList from '@app/store/empresa/list/list.reducer';
import * as fromFormEmpresa from '@app/store/empresa/form/form.reducer';
import { getLoading as getListLoading, getEmpresas } from '@app/store/empresa/list/list.selectors';
import { ListActions } from '@app/store/empresa/list/list.actions';
import { FormActions } from '@app/store/empresa/form/form.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  empresas$ !: Observable<Empresa[]>
  isActiveLoading$ !: Observable<boolean | null>;
  isListLoading$ !: Observable<boolean | null>;


  constructor(
    private storeFormEmpresa: Store<fromFormEmpresa.FormState>,
    private storeEmpresasList: Store<fromEmpresasList.ListState>,
    private router: Router) { }

  ngOnInit(): void {

    this.isListLoading$ = this.storeEmpresasList.select(getListLoading);

    this.storeEmpresasList.dispatch(ListActions.readAllStart());
    this.empresas$ = this.storeEmpresasList.select(getEmpresas) as Observable<Empresa[]>
  }

  onEmpresaSelect(empresaId: number) {
    let id = empresaId.toString();
    this.storeFormEmpresa.dispatch(FormActions.readStart({ empresaId: id }))
    this.router.navigate(['/admin/facturas', empresaId])
  }

}
