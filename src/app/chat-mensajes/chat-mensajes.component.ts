import {Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ViewEncapsulation} from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { addIcons } from "ionicons";
import { paperPlaneOutline } from "ionicons/icons";
import { ActivatedRoute } from "@angular/router";
import { ChatService } from "../servicio/chat.service";
import { Mensaje } from "../models/Mensaje";
import { CommonModule } from "@angular/common";
import { UsuarioService } from "../servicio/usuario.service";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import { IonContent } from "@ionic/angular/standalone";
import {Perfil} from "../models/Perfil";

@Component({
  selector: 'app-chat-mensajes',
  templateUrl: './chat-mensajes.component.html',
  styleUrls: ['./chat-mensajes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    IonicModule, CommonModule, FormsModule, ReactiveFormsModule
  ]
})
export class ChatMensajesComponent implements OnInit, OnDestroy, AfterViewInit {
  protected chatId: number = 0;
  protected mensajes: Mensaje[] = [];
  protected textoMensaje = "";
  protected nuevoMensaje: Mensaje = new Mensaje();
  protected mensajeForm: FormGroup;
  private chatSubscription!: Subscription;

  @ViewChild('content') content!: IonContent;
  protected username: string | undefined = "";
  protected userId: number | null = null;
  private idPerfil: string | undefined | Observable<Perfil> = "";
  private perfil: Perfil = new Perfil();

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) {
    addIcons({ paperPlaneOutline });

    this.mensajeForm = this.fb.group({
      texto: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.usuarioService.getNombrePerfil().subscribe({
      next: (d: Perfil) => { // Ahora se espera un objeto de tipo Perfil
        this.perfil = d;     // Asigna el objeto completo
        this.username = this.perfil.nombre; // Obtén el nombre desde el objeto perfil
        console.log(this.username);
      },
      error: (e) => console.error("Error al cargar el nombre de perfil:", e)
    });

    this.chatService.chatObservable.subscribe({
      next: (v) => {
        const nuevoId = v === 0 || v == null ? this.username : this.usuarioService.getNombrePerfil();

        if (this.idPerfil !== nuevoId) {  // Solo recargar si el ID cambia
          this.idPerfil = nuevoId;
          this.nuevoMensaje.nombreEmisor = String(this.idPerfil);

          this.cargarChats(); // Recargar mensajes al cambiar la conversación

          console.log(this.idPerfil);
        }
      }
    });

    // Suscripción al cambio de contacto
    this.chatSubscription = this.chatService.chatObservable.subscribe({
      next: (v) => {
        const nuevoId = v === 0 || v == null ? this.userId : v;
        if (nuevoId !== this.userId) {
          this.userId = nuevoId;
          this.username = sessionStorage.getItem('username') || "";
          this.cargarChats();
        }
      }
    });

    this.cargarChats(); // Asegurar que se cargan los mensajes al iniciar
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.content) {
        this.content.scrollToBottom(300);
      }
    }, 100);
  }

  ngOnDestroy() {
    if (this.chatSubscription) {
      this.chatSubscription.unsubscribe();
    }
  }

  cargarChats(): void {
    this.chatId = Number(sessionStorage.getItem('chat'));
    this.chatService.cargarMensajesChat(this.chatId).subscribe({
      next: (d) => {
        this.mensajes = d;
      },
      error: (e) => console.error("Error al cargar mensajes:", e),
      complete: () => {
        this.scrollToBottom();
      }
    });
  }

  enviarMensaje(): void {
    if (this.mensajeForm.valid && this.userId !== null) {
      this.nuevoMensaje = {
        contenido: this.mensajeForm.value.texto,
        idChat: this.chatId,
        idEmisor: this.userId,
        nombreEmisor: this.username, // Asegurar que se envía el nombre correcto
        fecha: new Date().toISOString()
      };

      this.chatService.enviarMensaje(this.nuevoMensaje).subscribe({
        next: () => {},
        error: (e) => console.error("Error al enviar mensaje:", e),
        complete: () => {
          this.mensajeForm.reset();
          this.cargarChats();
        }
      });
    }
  }

  protected readonly sessionStorage = sessionStorage;
}

