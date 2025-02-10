import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Usuario} from "../models/Usuario";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = environment.apiUrl;
  private perfilUrl = '/perfil/id/';


  constructor(private http: HttpClient) { }

  getById(id: number | null): Observable<Usuario> {
    return this.http.get<any>(`${this.apiUrl+this.perfilUrl}`+id);
  }
}

