import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Chat} from "../models/Chat";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpClient: HttpClient) { }

  getChats(): Observable<Chat[]> {
    return this.httpClient.get<any>('/api/chat/conversaciones/2');
  }
}
