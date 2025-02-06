import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';


//metodo/clase encargado de redirigir al usuario a la pagina de inicio si no está autenticado

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('auth-token');

  if (token && token !== 'undefined' && token !== 'null') {
    return true; // Usuario autenticado, permitir acceso
  } else {
    router.navigate(['/inicio']); // Redirige al login si no está autenticado
    return false;
  }
};
