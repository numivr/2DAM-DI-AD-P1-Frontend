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
        const token = this.authService.getToken(); // Obtener el token desde AuthService

        if (!token) {
            console.warn('⚠️ No se encontró token en sessionStorage/localStorage.');
            return throwError(() => new Error('No se encontró token de autenticación'));
        }

        console.log('✅ Token enviado en Authorization:', token); // Verificar si el token se envía correctamente

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });

        return this.http.get<Publicacion[]>('api/publicacion/listarPublicacion', { headers }).pipe(
            catchError((error) => {
                console.error('❌ Error al obtener publicaciones:', error);
                return throwError(() => new Error('Error en la solicitud de publicaciones'));
            })
        );
    }
}
