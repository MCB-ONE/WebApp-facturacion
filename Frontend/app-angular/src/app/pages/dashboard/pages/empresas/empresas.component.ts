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
  }

}
