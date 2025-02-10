import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Chat} from "../models/Chat";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private urlChats  = '/mensaje/chats';
  private urlMensajeEnviar  = '/mensaje/enviar';
  private urlMensajesChatPrivado  = '/mensaje/chat/';
  private apiUrl = environment.apiUrl;
  private contactoObservable = new BehaviorSubject<number>(0);
  contacto = this.contactoObservable.asObservable();


  private usuarioObservable = new BehaviorSubject<number>(0);
  usuario = this.usuarioObservable.asObservable();

  constructor(private http: HttpClient) { }

  getChats(): Observable<Chat[]> {
    return this.http.get<any>('/api/chat/conversaciones');
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
