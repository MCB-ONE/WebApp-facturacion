import { Component, OnInit } from '@angular/core';
import { Empresa, FacturaEmpresa } from '@app/models/backend';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromFormEmpresa from '@app/store/empresa/form/form.reducer';
import * as fromFacturaList from '@app/store/factura/list/list.reducer';
import { getEmpresa } from '@app/store/empresa/form/from.selectors';
import { TableColumn } from '@app/models/frontend';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})
export class FacturasComponent implements OnInit {

  isLoaded: boolean = false;
  activeEmpresa$!: Observable<Empresa | null>
  empresaId!: number | null;
  facturasList!: FacturaEmpresa[] | null
  tableColumns !: TableColumn[];

  constructor(
    private facturaForStore: Store<fromFormEmpresa.FormState>,
    private facturaListStore: Store<fromFacturaList.ListState>,
    ) { }

  ngOnInit(): void {
    this.activeEmpresa$ = this.facturaForStore.select(getEmpresa) as Observable<Empresa | null>
    this.activeEmpresa$.subscribe((data) => {
      if (data?.id) {
        this.empresaId = data.id;
        this.facturasList = data.facturas;
        this.isLoaded = true;
      }
    })

    this.initColumns();
  }

  initColumns(): void {
    this.tableColumns = [
      {
        name: 'Numero',
        dataKey: 'numero',
        isSortable: true,
      },
      {
        name: 'Fecha de expedición',
        dataKey: 'fechaExpedicion',
        isSortable: true,
      },
      {
        name: 'Nombre cliente',
        dataKey: 'cliente.nombre',
        isSortable: false,
      },
      {
        name: 'NIF cliente',
        dataKey: 'cliente.email',
        isSortable: false,
      },

      {
        name: 'Subtotal',
        dataKey: 'subtotal',
        isSortable: true,
      },
      {
        name: 'Iva',
        dataKey: 'iva',
        isSortable: true,
      },
      {
        name: 'Total',
        dataKey: 'total',
        isSortable: true,
      },
    ];
  }

}
