import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsuarioLogin} from "../1-Modelos/UsuarioLogin";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(private httpClient: HttpClient) { }



  //Este metodo sirve para loggear el usuario, devolverá un token que se guardará en el local storage
  //Se comunica con el endpoint auth/login
  PostLogin(usuarioLogeando: UsuarioLogin){
    return this.httpClient.post<any>(`${environment.apiUrl}/auth/login`,usuarioLogeando);
  }


















}
