import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
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
  ]
})
export class ChatsPersonasComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  chats : Chat[] = [];
  filteredChats: any[] = [];
  searchTerm: string = '';

  nombre: string = '';
  tipo: string = 'grupal';
  miembros: number[] = [];

  filterChats(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm.trim() === '') {
      this.filteredChats = this.chats.map(chat => ({
        ...chat,
        highlightedName: chat.nombre
      }));
    } else {
      this.filteredChats = this.chats
        .filter(chat => chat.nombre?.toLowerCase().includes(searchTerm))
        .map(chat => {
          const regex = new RegExp(`(${searchTerm})`, 'gi');
          const highlightedName = chat.nombre?.replace(regex, '<mark>$1</mark>');
          return {
            ...chat,
            highlightedName
          };
        });
    }
  }

  constructor(private chatService: ChatService, private router: Router) {
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
  }

  navigateToChat(chatId: any) {
    this.chatService.setChatId(chatId);
    console.log(this.chatService.getChatId());
    this.router.navigate(['/mensajes/conversacion/', chatId])
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    const dto = {
      nombre: this.name,
      tipo: this.tipo,
      miembros: this.miembros
    };
    this.modal.dismiss(dto, 'confirm');
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      console.log('DTO:', event.detail.data);
      // Handle the DTO here, e.g., send it to the server
    }
  }

  protected readonly name = name;
}
