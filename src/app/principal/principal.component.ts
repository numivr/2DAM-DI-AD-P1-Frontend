import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, IonicModule } from '@ionic/angular';
import { add, chatbubblesOutline, personCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Usuario } from '../models/Usuario';
import { Publicacion } from '../models/Publicacion';
import { ComponentePublicacionComponent } from '../componentes/componente-publicacion/componente-publicacion.component';
import { RouterLink } from '@angular/router';
import { NgIf, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgOptimizedImage,
    ComponentePublicacionComponent,
    RouterLink,
    NgIf
  ],
})
export class PrincipalComponent implements OnInit {
  selectedSegment: string = 'Recomendado';
  usuarios: Usuario[] = [];
  publicaciones: Publicacion[] = [];


  ngOnInit() {
    addIcons({
      'add': add,
      'chatbubbles-outline': chatbubblesOutline,
      'person-circle': personCircle,
    });
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  isModalOpen = false; // Estado para controlar la visibilidad del modal

  openModal() {
    this.isModalOpen = true; // Abre el modal
  }

  closeModal() {
    this.isModalOpen = false; // Cierra el modal
  }

  truncateText(text: string, limit: number = 40): string {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  }

}
