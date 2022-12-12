import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewFacturaComponent } from './new-factura.component';
import { NewFacturaModule } from './new-factura.module';

const routes: Routes = [
  {
    path: '',
    component: NewFacturaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewFacturaRoutingModule { }
