import {Component, OnInit, ViewChild} from '@angular/core';
import {IonModal, IonicModule} from '@ionic/angular';
import {add, chatbubblesOutline, personCircle} from 'ionicons/icons';
import {addIcons} from 'ionicons';
import {Usuario} from '../models/Usuario';
import {Publicacion} from '../models/Publicacion';
import {ComponentePublicacionComponent} from '../componentes/componente-publicacion/componente-publicacion.component';
import {RouterLink} from '@angular/router';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {FormsModule} from "@angular/forms";

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
    NgIf,
    FormsModule
  ],
})
export class PrincipalComponent implements OnInit {
  selectedSegment: string = 'Recomendado';
  usuarios: Usuario[] = [];
  publicaciones: Publicacion[] = [];
  isModalOpen: boolean = false;

  ngOnInit() {
    addIcons({
      'add': add,
      'chatbubbles-outline': chatbubblesOutline,
      'person-circle': personCircle,
    });

    // Ensure the modal is closed initially
    const modal = document.querySelector('ion-modal');
    if (modal) {
      modal.classList.add('closed');
    }
  }

  openModal() {
    this.isModalOpen = true;
    const modal = document.querySelector('ion-modal');
    if (modal) {
      modal.classList.remove('closed');
      modal.classList.add('open');
    }
  }

  closeModal() {
    const modal = document.querySelector('ion-modal');
    if (modal) {
      modal.classList.remove('open');
      modal.classList.add('closed');
    }
    // Usa un delay para sincronizar el cambio de estado con la animación
    setTimeout(() => {
      this.isModalOpen = false;
    }, 300);
  }


  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  truncateText(text: string, limit: number = 40): string {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  }
}
