import {Component, OnInit, OnDestroy, ViewChild, AfterViewInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {addIcons} from "ionicons";
import {paperPlaneOutline} from "ionicons/icons";
import {ActivatedRoute} from "@angular/router";
import {ChatService} from "../servicio/chat.service";
import {Mensaje} from "../models/Mensaje";
import {CommonModule} from "@angular/common";
import {Usuario} from "../models/Usuario";
import {UsuarioService} from "../servicio/usuario.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {interval, Subscription} from "rxjs";
import {IonContent} from "@ionic/angular/standalone";

@Component({
  selector: 'app-chat-mensajes',
  templateUrl: './chat-mensajes.component.html',
  styleUrls: ['./chat-mensajes.component.scss'],
  standalone: true,
  imports: [
    IonicModule, CommonModule, FormsModule, ReactiveFormsModule
  ]
})
export class ChatMensajesComponent  implements OnInit, OnDestroy, AfterViewInit {
  protected idPerfil: number = 0;
  protected mensajes: Mensaje[] = [];
  protected perfil: Usuario = new Usuario();
  protected textoMensaje = "";
  protected nuevoMensaje: Mensaje = new Mensaje();
  protected readonly sessionStorage = sessionStorage;
  protected mensajeForm: FormGroup;
  private chatSubscription!: Subscription;
  @ViewChild('content') content!: IonContent;

  constructor(private route: ActivatedRoute, private chatService: ChatService,
              private usuarioService: UsuarioService, private fb: FormBuilder) {
    addIcons({paperPlaneOutline});
    this.mensajeForm = this.fb.group({
      texto: [this.nuevoMensaje.mensaje, Validators.required],
    });

  }

  ngOnInit() {
    this.chatService.usuario.subscribe({
      next: (v) => {
        const nuevoId = v === 0 || v == null ? Number(sessionStorage.getItem('usuario')) : this.chatService.getUsuarioId();

        if (this.idPerfil !== nuevoId) {  // Solo recargar si el ID cambia
          this.idPerfil = nuevoId;
          this.nuevoMensaje.idReceptor = this.idPerfil;
          this.cargarContacto();
          this.cargarChats(); // Recargar mensajes al cambiar la conversación
        }
      }
    });

    this.chatSubscription = interval(30000).subscribe(() => {
      this.cargarChats();
    });
  }


  ngAfterViewInit() {
    // Asegurar scroll automático cuando se cargue el chat
    setTimeout(() => {
      this.scrollToBottom();
    }, 500);
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.content) {
        this.content.scrollToBottom(0); // Prueba con 500ms para un desplazamiento más suave
      }
    }, 0); // Esperar 300ms antes de ejecutar el scroll
  }


  ngOnDestroy() {
    // 🚀 Cancela la suscripción cuando el componente se destruye
    if (this.chatSubscription) {
      this.chatSubscription.unsubscribe();
    }
  }


  cargarChats(): void {
    this.chatService.cargarMensajesChat(this.idPerfil).subscribe({
        next: (d) => {
          this.mensajes = d;
        },
        error: (e) => {
          console.error(e);
        },
        complete: () => {

          // 🔽 Baja el scroll
          this.scrollToBottom();
        }

      }
    );
  }


  cargarContacto(): void {
    this.usuarioService.getById(this.idPerfil).subscribe({
        next: (p) => {
          this.perfil = p;
        },
        error: (e) => {
          console.error(e);
        },
        complete: () =>
          console.info(this.perfil)

      }
    );
  }


  enviarMensaje(): void {

    if (this.mensajeForm.valid) {
      this.nuevoMensaje = {...this.nuevoMensaje, ...this.mensajeForm.value};
      console.info(this.nuevoMensaje);

      this.chatService.enviarMensaje(this.nuevoMensaje).subscribe({
          next: (p) => {

          },
          error: (e) => {
            console.error(e);
          },
          complete: () => {
            this.mensajeForm.reset();
            this.cargarChats(); // 🔄 Llamar cargarChats() en vez de `ngOnInit()`
          }

        }
      );

    } else {

    }

  }


}
