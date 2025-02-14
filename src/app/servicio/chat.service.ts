import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Chat } from "../models/Chat";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Mensaje } from "../models/Mensaje";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private urlChats  = '/mensaje/chats';
  private urlMensajeEnviar  = '/mensaje/enviar';
  private urlMensajesChatPrivado  = '/mensajes/conversacion/';
  private apiUrl = '/api'; // 👈 Proxy para evitar CORS
  private contactoObservable = new BehaviorSubject<number>(0);
  contacto = this.contactoObservable.asObservable();
  chatObservable = new BehaviorSubject<number>(0);


  private usuarioObservable = new BehaviorSubject<number>(0);
  usuario = this.usuarioObservable.asObservable();


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

  getChats(): Observable<Chat[]> {
    return this.http.get<any>('/api/chat/conversaciones', { headers: this.getHeaders() });
  }

  setUsuarioId(id: number) {
    sessionStorage.setItem('usuario', String(id));
    this.usuarioObservable.next(id);
  }

  getUsuarioId() {
    if (this.usuarioObservable.value === null) {
      return Number(sessionStorage.getItem('usuario'));
    }
    return this.usuarioObservable.value;
  }

  cargarMensajesChat(chatId: number): Observable<Mensaje[]> {
    console.log('Cargando mensajes del chat:', chatId);
    sessionStorage.setItem('chat', String(chatId));
    return this.http.get<any>(`${this.apiUrl + this.urlMensajesChatPrivado}` + chatId);
  }


  enviarMensaje(mensaje: Mensaje) {
    return this.http.post<any>(`${this.apiUrl + this.urlMensajeEnviar}`, mensaje);
  }

  setChatId(chatId: number) {
    sessionStorage.setItem('chat', String(chatId));
    this.usuarioObservable.next(chatId);
  }
  getChatId(): number  {
    if(this.chatObservable.value ===null){
      return Number(sessionStorage.getItem('contacto'));
    }
    return this.chatObservable.value;
  }
}
