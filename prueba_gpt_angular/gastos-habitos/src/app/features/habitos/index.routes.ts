import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./habitos.page').then((m) => m.HabitosPageComponent),
  },
];
