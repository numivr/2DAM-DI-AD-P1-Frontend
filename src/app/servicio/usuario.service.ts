import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = '/api/usuarios'; // 👈 Proxy para evitar CORS
  private perfilUrl = '/perfil/id/';


  constructor(private http: HttpClient) { }


}

