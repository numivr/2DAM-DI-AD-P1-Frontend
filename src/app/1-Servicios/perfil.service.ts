import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Perfil } from "../1-Modelos/Perfil";

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = '/api/perfil'; // 👈 Usamos proxy para evitar CORS

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('auth-token');

    if (!token) {
      console.error('❌ No hay token en sessionStorage. Asegúrate de que el usuario haya iniciado sesión.');
      return new HttpHeaders(); // Devolvemos headers vacíos para evitar errores
    }

    console.log('✅ Token enviado en el header:', token);

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  obtenerPerfilLoggeado(): Observable<Perfil> {
    return this.http.get<Perfil>(`${this.apiUrl}/perfilLoggeado`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error('❌ Error al obtener perfil:', error);
          return throwError(() => new Error('Error en la solicitud del perfil'));
        })
      );
  }
}
