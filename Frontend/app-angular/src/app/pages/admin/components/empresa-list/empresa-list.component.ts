import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Empresa } from '@app/models/backend';

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.scss']
})
export class EmpresaListComponent implements OnInit {

  @Input() empresas !: Empresa[];
  @Output() selectEmpresa: EventEmitter<number>
  @Output() removeEmpresa: EventEmitter<number>


  constructor() {
    this.selectEmpresa = new EventEmitter();
    this.removeEmpresa = new EventEmitter();
   }

  ngOnInit(): void {
  }

  onSelected(empresaId: number ){
    this.selectEmpresa.emit(empresaId);
  }

  onRemove(empresaId: number ){
    this.removeEmpresa.emit(empresaId);
  }
}
