import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { authStore } from './auth.store';

export const authGuard: CanActivateFn = () => {
  if (authStore.isLoggedIn()) return true;
  const router = inject(Router);
  router.navigateByUrl('/habitos');
  return false;
};