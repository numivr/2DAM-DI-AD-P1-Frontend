import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Publicacion } from "../1-Modelos/Publicacion";

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  private apiUrl = '/api/publicacion'; // 👈 Usamos el proxy en lugar de la URL completa

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

  obtenerPublicaciones(): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(`${this.apiUrl}/listarPublicaciones`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error('❌ Error al obtener publicaciones:', error);
          return throwError(() => new Error('Error en la solicitud de publicaciones'));
        })
      );
  }

  obtenerPublicacionesSeguidos(): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(`${this.apiUrl}/siguiendo`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error('❌ Error al obtener publicaciones de seguidos:', error);
          return throwError(() => new Error('Error en la solicitud de publicaciones de seguidos'));
        })
      );
  }


  obtenerPublicacionPorId(id: number): Observable<Publicacion> {
    return this.http.get<Publicacion>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error(`❌ Error al obtener la publicación con ID ${id}:`, error);
          return throwError(() => new Error('Error en la solicitud de la publicación'));
        })
      );
  }



  darLike(idPublicacion: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${idPublicacion}`, {}, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error('❌ Error al dar like:', error);
          return throwError(() => new Error('Error al dar like'));
        })
      );
  }

  quitarLike(idPublicacion: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idPublicacion}`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error('❌ Error al quitar like:', error);
          return throwError(() => new Error('Error al quitar like'));
        })
      );
  }

  crearPublicacion(nuevaPublicacion: { texto: string; fotoPublicacion: string }): Observable<Publicacion> {
    return this.http.post<Publicacion>(`${this.apiUrl}/crear`, nuevaPublicacion, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error('❌ Error al crear la publicación:', error);
          return throwError(() => new Error('Error al crear la publicación'));
        })
      );
  }

}
