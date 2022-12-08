import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { NewEmpresaComponent } from './new-empresa.component';

const routes: Routes = [
  {
    path: '',
    component: NewEmpresaComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewEmpresaRoutingModule { }
