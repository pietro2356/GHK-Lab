import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'ghk-lab',
    loadComponent : () =>
      import('./features/ghk-lab/ghk-lab').then(m => m.GhkLab),
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'ghk-lab',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'ghk-lab',
    pathMatch: 'full',
  }
];
