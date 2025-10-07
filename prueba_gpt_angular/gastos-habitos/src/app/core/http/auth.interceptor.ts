import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { loaderStore } from './loader.store';
import { authStore } from '../auth.store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  loaderStore.start();
  const user = authStore.user();
  const headers = user ? req.headers.set('Authorization', 'Bearer fake-token') : req.headers;
  return next(req.clone({ headers })).pipe(finalize(() => loaderStore.stop()));

  const token = authStore.isLoggedIn() ? 'fake-token' : '';

  // Si hay token, lo añadimos a la cabecera Authorization
  const cloned = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  // Activamos el loader antes de enviar la petición
  loaderStore.start();

  return next(cloned).pipe(
    finalize(() => {
      // Cuando acaba (éxito o error), desactivamos el loader
      loaderStore.stop();
    })
  );
};
