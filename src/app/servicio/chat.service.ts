import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Chat} from "../models/Chat";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Mensaje} from "../models/Mensaje";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private urlChats  = '/mensaje/chats';
  private urlMensajeEnviar  = '/mensaje/enviar';
  private urlMensajesChatPrivado  = '/mensaje/chat/';
  private apiUrl = '/api'; // 👈 Proxy para evitar CORS
  private contactoObservable = new BehaviorSubject<number>(0);
  contacto = this.contactoObservable.asObservable();


  private usuarioObservable = new BehaviorSubject<number>(0);
  usuario = this.usuarioObservable.asObservable();

  constructor(private http: HttpClient) { }

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

  getChats(): Observable<Chat[]> {
    return this.http.get<any>('/api/chat/conversaciones', { headers: this.getHeaders() });
  }

  setUsuarioId(id: number) {
    sessionStorage.setItem('usuario', String(id));
    this.usuarioObservable.next(id);
  }

  getUsuarioId() {
    if(this.usuarioObservable.value ===null){
      return Number(sessionStorage.getItem('usuario'));
    }
    return this.usuarioObservable.value;
  }
  cargarMensajesChat(idPerfil: number | null): Observable<Mensaje[]> {
    return this.http.get<any>(`${this.apiUrl+this.urlMensajesChatPrivado}`+idPerfil);
  }
  enviarMensaje(mensaje:Mensaje){
    return this.http.post<any>(`${this.apiUrl+this.urlMensajeEnviar}`,mensaje );
  }

}
