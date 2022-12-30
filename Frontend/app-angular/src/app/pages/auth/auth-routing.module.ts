import { UnauthGuard } from './../../guards/unauth/unauth.guard';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
        canActivate: [UnauthGuard]
      },
      {
        path: 'registro',
        loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationModule),
        canActivate: [UnauthGuard]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'static/404'
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'static/404'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
