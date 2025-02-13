import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../environments/environment";
import {Mensaje} from "../models/Mensaje";
import {Perfil} from "../models/Perfil";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = environment.apiUrl;
  private perfilUrl = '/perfil/';


  constructor(private http: HttpClient) { }


  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('auth-token');
    if (!token) {
      console.error('❌ No hay token en sessionStorage. Asegúrate de que el usuario haya iniciado sesión.');
      return new HttpHeaders();
    }
    console.log('✅ Token enviado en el header:', token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  // Método para obtener el perfil de un usuario
  getNombrePerfil(): Observable<Perfil> {
    return this.http.get<Perfil>(`/api/perfil/perfilLoggeado`, { headers: this.getHeaders() });
  }



}

