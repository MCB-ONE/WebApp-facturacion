import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
      },
      {
        path: 'empresas',
        loadChildren: () => import('./pages/empresas/empresas.module').then(m => m.EmpresasModule)
      },
      {
        path: 'facturas',
        loadChildren: () => import('./pages/facturas/facturas.module').then(m => m.FacturasModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'inicio'
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'static/404'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
