import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard, LoginGuard} from './guards';

import {NotFoundComponent} from '../pages/not-found/not-found.component';
import {HomePageComponent} from '../pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    canActivate: [LoginGuard],
    loadChildren: '../pages/auth/auth.module#AuthModule'
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomePageComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: '../pages/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
