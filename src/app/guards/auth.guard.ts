import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Usuario logueado, permite acceso
  } else {
    // Retorna un UrlTree para redirigir a login sin navegación explícita
    return router.parseUrl('/login');
  }
};
