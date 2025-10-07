import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'gastos',
    pathMatch: 'full',
  },
  {
    path: 'gastos',
    loadChildren: () => import('./features/gastos/index.routes').then((m) => m.routes),
  },
  {
    path: 'habitos',
    loadChildren: () => import('./features/habitos/index.routes').then((m) => m.routes),
  },
  { path: '**', redirectTo: 'gastos' },
];
