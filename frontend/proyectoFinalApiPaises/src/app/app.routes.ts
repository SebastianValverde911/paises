import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./home/home.page').then( (m) => m.HomePage),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/registry/registry.page').then( m => m.RegistryPage)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }
];
