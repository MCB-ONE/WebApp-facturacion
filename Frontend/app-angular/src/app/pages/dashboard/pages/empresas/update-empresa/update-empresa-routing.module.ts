import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateEmpresaComponent } from './update-empresa.component';

const routes: Routes = [
  {
    path: '',
    component: UpdateEmpresaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateEmpresaRoutingModule { }
