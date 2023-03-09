import { Empresa } from '@app/models/backend';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActiveActions } from '@app/store/empresa/active/active.actions';

@Component({
  selector: 'app-empresas-table',
  templateUrl: './empresas-table.component.html',
  styleUrls: ['./empresas-table.component.scss']
})

export class EmpresasTableComponent implements OnInit, AfterViewInit {

  displayedColumns = ['nombre', 'nif', 'dirección', 'telefono', 'email', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);
  @Output() selectEmpresa: EventEmitter<number>
  @Output() removeEmpresa: EventEmitter<number>

  @ViewChild(MatPaginator, { static: false }) matPaginator!: MatPaginator | null;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @Input() tableData!: any[]

  constructor() {
    this.selectEmpresa = new EventEmitter();
    this.removeEmpresa = new EventEmitter();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {

    this.dataSource.data = this.tableData;
    this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSelected(empresaId: number ){
    this.selectEmpresa.emit(empresaId);
  }

  onRemove(empresaId: number ){
    this.removeEmpresa.emit(empresaId);
  }

}
