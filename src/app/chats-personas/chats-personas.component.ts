import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader, IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRow,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {Chat} from "../models/Chat";
import {ChatService} from "../servicio/chat.service";
import {addIcons} from "ionicons";
import {eye, paperPlaneOutline} from "ionicons/icons";
import {style} from "@angular/animations";
import {Router} from "@angular/router";
import { FormsModule } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core/components';
import {Perfil} from "../models/Perfil";
import {UsuarioService} from "../1-Servicios/usuario.service";
import {UsuarioServiceNombre} from "../servicio/usuario-service-nombre.service";

@Component({
  selector: 'app-chats-personas',
  templateUrl: './chats-personas.component.html',
  styleUrls: ['./chats-personas.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonTitle,
    IonButton,
    IonIcon,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonImg,
    IonText,
    IonSearchbar,
    IonModal,
    IonItem,
    IonInput,
    IonCheckbox,
    IonAvatar,
    IonLabel,
    IonList,
  ]
})
export class ChatsPersonasComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  chats : Chat[] = [];
  amigos: Perfil[] = [];
  filteredChats: any[] = [];
  filteredAmigos: any[] = [];
  searchTermChats: string = '';
  searchTermAmigos: string = '';
  nombre: string = '';
  tipo: string = '';
  miembros: string[] = [];
  protected name?: '';
  seleccionados = new Map<string, boolean>(); // Mapea ID o email a booleano
  descripcion: string = '';


  filterChats(event: any) {
    const searchTermChats = event.target.value.toLowerCase();
    if (searchTermChats.trim() === '') {
      this.filteredChats = this.chats.map(chat => ({
        ...chat,
        highlightedName: chat.nombre
      }));
    } else {
      this.filteredChats = this.chats
        .filter(chat => chat.nombre?.toLowerCase().includes(searchTermChats))
        .map(chat => {
          const regex = new RegExp(`(${searchTermChats})`, 'gi');
          const highlightedName = chat.nombre?.replace(regex, '<mark>$1</mark>');
          return {
            ...chat,
            highlightedName
          };
        });
    }
  }

  filterAmigos(event: any) {
    const searchTermAmigos = event.target.value.toLowerCase();
    console.log('searchTermAmigos:', searchTermAmigos);
    if (searchTermAmigos.trim() === '') {
      console.log('searchTermAmigos is empty');
      this.filteredAmigos = this.amigos.map(amigos => ({
        ...amigos,
        highlightedName: amigos.nombre

      }));
    } else {
      this.filteredAmigos = this.amigos
        .filter(amigos => amigos.nombre?.toLowerCase().includes(searchTermAmigos))
        .map(amigos => {
          const regex = new RegExp(`(${searchTermAmigos})`, 'gi');
          const highlightedName = amigos.nombre?.replace(regex, '<mark>$1</mark>');
          return {
            ...amigos,
            highlightedName
          };
        });
      console.log('filteredAmigos:', this.amigos);
    }
  }



  constructor(private chatService: ChatService, private router: Router, private usuarioService: UsuarioServiceNombre) {
    addIcons({eye})
  }

  ngOnInit() {
    this.chatService.getChats().subscribe({
      next: (data) => {
        this.chats = data;
        this.filteredChats = data; // Initialize filteredChats with all chats
      },
      error: (error) => console.error('Error:', error),
      complete: () => console.log('Completado')
    });

    this.usuarioService.getAmigos().subscribe({
      next: (data) => {
        this.amigos = data;
        this.filteredAmigos = data
      },
      error: (error) => console.error('Error:', error),
      complete: () => console.log('Completado')
    });


  }


  isSeleccionado(nombre: string | undefined): boolean {
    return this.seleccionados.get(<string>nombre) || false;
  }

  navigateToChat(chatId: any) {
    this.chatService.setChatId(chatId);
    console.log(this.chatService.getChatId());
    this.router.navigate(['/mensajes/conversacion/', chatId])
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  toggleSeleccion(nombre: string | undefined) {
    if (nombre) {
      if (this.seleccionados.has(nombre)) {
        this.seleccionados.delete(nombre);
      } else {
        this.seleccionados.set(nombre, true);
      }
    }
    this.actualizarMiembros();
  }

  actualizarMiembros() {
    this.miembros = Array.from(this.seleccionados.keys());
  }

  confirm() {
    this.actualizarMiembros(); // Asegurar que miembros tiene los seleccionados

    if (this.miembros.length === 0) {
      alert("Debes seleccionar al menos un amigo para crear el grupo.");
      return;
    }
    if (this.miembros.length === 1){
      this.tipo = 'privado';
    } else {
      this.tipo = 'grupo';
    }
    const dto = {
      nombre: this.name,
      miembros: this.miembros,
      tipo: this.tipo
    };

    this.modal.dismiss(dto, 'confirm');
    console.log('DTO:', dto);
  }


  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      console.log('DTO:', event.detail.data);

      this.chatService.crearGrupo(event.detail.data).subscribe({
        next: (response) => {
          console.log("✅ Grupo creado:", response);
          this.chatService.getChats().subscribe({
            next: (data) => {
              this.chats = data;
              this.filteredChats = data; // Initialize filteredChats with all chats
            },
            error: (error) => console.error('Error:', error),
            complete: () => console.log('Completado')
          });        },
        error: (err) => {
          console.error("❌ Error al enviar grupo:", err);
          alert("Hubo un error al crear grupo. Inténtalo nuevamente.");
        }
      });
    }

    }
  }

