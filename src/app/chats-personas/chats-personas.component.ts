import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons, IonCard, IonCardHeader, IonCol, IonContent, IonGrid,
  IonHeader,
  IonIcon, IonImg, IonInput, IonItem, IonRow, IonSearchbar, IonText,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {Chat} from "../models/Chat";
import {ChatService} from "../servicio/chat.service";
import {addIcons} from "ionicons";
import {eye, paperPlaneOutline} from "ionicons/icons";
import {style} from "@angular/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-chats-personas',
  templateUrl: './chats-personas.component.html',
  styleUrls: ['./chats-personas.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
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
  ]
})
export class ChatsPersonasComponent implements OnInit {

  chats : Chat[] = [];
  filteredChats: any[] = [];
  searchTerm: string = '';



  chatsss = [
    {
      avatar: 'https://img.freepik.com/fotos-premium/perfil-cabeza-perro-marron_138545-178.jpg', // URL de la imagen
      username: '@lucas.doggy',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',

    },
    {
      avatar: 'https://estaticos-cdn.prensaiberica.es/clip/ddd42d3e-7edd-4029-8ea1-00fc4eff1118_original-libre-aspect-ratio_default_0.jpg',
      username: '@silvana',
      descripcion: 'Sed dignissim rhoncus mi in vulputate.'
    },
    {
      avatar: 'https://fotografias.lasexta.com/clipping/cmsimages01/2014/08/29/1999E4E2-1D98-4806-8D9B-3824A9BB02DF/69.jpg?crop=643,362,x0,y45&width=1280&height=720&optimize=low&format=jpg',
      username: '@perro.de.la.pradera.24',
      descripcion: 'Aenean aliquet ante at lorem suscipit porttitor.'
    }
  ];



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
}
