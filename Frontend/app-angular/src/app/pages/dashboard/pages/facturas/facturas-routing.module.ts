import { FacturasComponent } from './facturas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: FacturasComponent
  },
  {
    path: 'nueva',
    loadChildren: () => import('./pages/new-factura/new-factura.module').then(m=> m.NewFacturaModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturasRoutingModule { }
