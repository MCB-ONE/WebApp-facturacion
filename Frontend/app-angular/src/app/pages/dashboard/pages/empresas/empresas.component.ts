import { ListState } from '@app/store/empresa/list/list.reducer';
import { Component, OnInit } from '@angular/core';
import { ListActions } from '@app/store/empresa/list/list.actions';
import { Store } from '@ngrx/store';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {
  params = new HttpParams();
  constructor(private store: Store<ListState>,) { }

  ngOnInit(): void {
    //Seleccionar empresas y seleccionar empresa activa incial
    this.params = this.params.set('pageIndex', 1);
    this.params = this.params.set('pageSize', 3);
    this.params = this.params.set('sort', 'idDesc');

    this.store.dispatch(ListActions.readAllStart({
      requestPagination: this.params,
      paramsUrl: this.params.toString()
    }))
  }

}
