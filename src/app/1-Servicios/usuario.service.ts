import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `${environment.apiUrl}/usuarios`; // 👈 Proxy para evitar CORS

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('auth-token');

    if (!token) {
      console.error('❌ No hay token en sessionStorage. Asegúrate de que el usuario haya iniciado sesión.');
      return new HttpHeaders();
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }


  bannearUsuario(nombreUsuario: string): Observable<any>
  {
    return this.http.put(`${this.apiUrl}/banear/${nombreUsuario}`, {}, { headers: this.getHeaders() })
      .pipe(
        catchError(error =>
        {
          console.error("❌ Error al banear usuario:", error);
          return throwError(() => new Error("Error en la solicitud de banear usuario"));
        })
      );
  }
  eliminarUsuario(nombreUsuario: string): Observable<any>
  {
    return this.http.post(`${this.apiUrl}/eliminar/${nombreUsuario}`, {}, { headers: this.getHeaders() })
      .pipe(
        catchError(error =>
        {
          console.error("❌ Error al eliminar usuario:", error);
          return throwError(() => new Error("Error en la solicitud de eliminar usuario"));
        })
      );
  }


  seguir(nombreUsuario: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${nombreUsuario}/seguir`, {}, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error("❌ (frontend:services) Error al seguir usuario:", error);
          return throwError(() => new Error("Error en la solicitud de seguir usuario"));
        })
      );
  }

  dejarSeguir(nombreUsuario: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${nombreUsuario}/dejarSeguir`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error("❌ (frontend:services) Error al dejar de seguir usuario:", error);
          return throwError(() => new Error("Error en la solicitud de dejar de seguir usuario"));
        })
      );
  }
}
