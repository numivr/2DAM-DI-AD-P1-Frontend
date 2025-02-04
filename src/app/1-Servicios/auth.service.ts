import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private TOKEN_KEY = 'auth-token';  // Puedes cambiarlo a 'session-token' si usas sessionStorage
  private EXPIRATION_KEY = 'token-expiration'; // Opcional: Usado para almacenar la expiración del token

  constructor() {}

  // Guardar el token y su fecha de expiración (si existe)
  setToken(token: string, expiration: number | null = null) {
    if (token) {
      sessionStorage.setItem(this.TOKEN_KEY, token);  // Usar sessionStorage en lugar de localStorage

      // Si se proporciona la fecha de expiración, guardarla
      if (expiration) {
        sessionStorage.setItem(this.EXPIRATION_KEY, expiration.toString());
      }
    }
  }

  // Obtener el token desde sessionStorage
  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  // Eliminar el token y la fecha de expiración
  removeToken() {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.EXPIRATION_KEY);
  }

  // Verificar si el token sigue siendo válido
  isAuthenticated(): boolean {
    const token = this.getToken();
    const expiration = this.getTokenExpiration();

    // Si no hay token o si el token ha expirado, retorna false
    if (!token || !expiration || Date.now() > expiration) {
      this.removeToken();
      return false;
    }
    return true;  // Token válido y no expirado
  }

  // Obtener la fecha de expiración del token desde sessionStorage
  private getTokenExpiration(): number | null {
    const expiration = sessionStorage.getItem(this.EXPIRATION_KEY);
    return expiration ? parseInt(expiration, 10) : null;
  }
}

