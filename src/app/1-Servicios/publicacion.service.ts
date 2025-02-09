import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Publicacion} from "../1-Modelos/Publicacion";
import {AuthService} from "./auth.service";



@Injectable({
    providedIn: 'root'
})
export class PublicacionService {


    constructor(private http: HttpClient, private authService: AuthService) {}


  obtenerPublicaciones(): Observable<Publicacion[]> {
    const token = sessionStorage.getItem('auth-token');

    if (!token) {
      console.error('❌ No hay token en sessionStorage. Asegúrate de que el usuario haya iniciado sesión.');
      return throwError(() => new Error('No hay token disponible'));
    }

    console.log('✅ Token enviado en el header:', token); // Verifica si el token se está obteniendo correctamente

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<Publicacion[]>('api/publicacion/listarPublicaciones', { headers });
  }
}
