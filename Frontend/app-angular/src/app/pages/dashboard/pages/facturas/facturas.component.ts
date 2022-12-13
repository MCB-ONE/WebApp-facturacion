import { Factura } from '@app/models/backend/factura/index';
import { Component, OnInit } from '@angular/core';
import { Empresa } from '@app/models/backend';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromActiveEmpresa from '@app/store/empresa/active/active.reducer';
import * as fromFacturaList from '@app/store/factura/list/list.reducer';
import { getActiveEmpresa } from '@app/store/empresa/active/active.selectors';
import { ListActions } from '@app/store/factura/list/list.actions';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})
export class FacturasComponent implements OnInit {

  isLoaded: boolean = false;
  activeEmpresa$!: Observable<Empresa | null>
  empresaId!: number;
  facturasList!: Observable<Factura[] | null>

  constructor(
    private activeEmpresaStore: Store<fromActiveEmpresa.ActiveEmpresaState>,
    private facturaListStore: Store<fromFacturaList.ListState>,
    ) { }

  ngOnInit(): void {
    this.activeEmpresa$ = this.activeEmpresaStore.select(getActiveEmpresa) as Observable<Empresa | null>
    this.activeEmpresa$.subscribe((data) => {
      if (data?.id) {
        this.isLoaded = true;
        this.empresaId = data.id;
        this.facturaListStore.dispatch(ListActions.readAllStart({empresaId: data.id}))
      }
    })
  }

}
