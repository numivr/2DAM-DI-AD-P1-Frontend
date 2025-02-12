import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Comentario } from '../1-Modelos/Comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private apiUrl = '/api/comentario'; // ✅ Usamos el proxy en lugar de la URL completa

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

  /**
   * ✅ Crear un nuevo comentario en una publicación
   * @param idPublicacion - ID de la publicación a comentar
   * @param texto - Texto del comentario
   * @returns Observable<Comentario> - Devuelve el comentario creado
   */
  crearComentario(idPublicacion: number, texto: string): Observable<Comentario> {
    const comentarioRequest = { idPublicacion, texto };

    return this.http.post<Comentario>(`${this.apiUrl}/crear`, comentarioRequest, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error('❌ Error al crear el comentario:', error);
          return throwError(() => new Error('Error al crear el comentario'));
        })
      );
  }
}
