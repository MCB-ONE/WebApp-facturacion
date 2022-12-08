import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresasComponent } from './empresas.component';

const routes: Routes = [
  {
    path: '',
    component: EmpresasComponent
  },
  {
    path: 'nueva',
    loadChildren: () => import('./new-empresa/new-empresa.module').then(m=> m.NewEmpresaModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./update-empresa/update-empresa.module').then(m=> m.UpdateEmpresaModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresasRoutingModule { }
