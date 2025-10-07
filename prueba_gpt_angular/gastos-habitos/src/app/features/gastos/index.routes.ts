import { Routes } from '@angular/router';
import { authGuard } from '../../core/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate:[authGuard],
    loadComponent: () => import('./gastos.page').then((m) => m.GastosPageComponent),
  },
];
