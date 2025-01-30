import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicModule, IonModal} from '@ionic/angular';
import {add, chatbubblesOutline, imageOutline, personCircle} from 'ionicons/icons';
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
  isSearchModalOpen: boolean = false;
  isFabModalOpen: boolean = false;
  searchTerm: string = '';
  newPostTitle: string = '';
  newPostDescription: string = '';


  @ViewChild('crearPublicacionModal') modal!: IonModal;

  ngOnInit() {
    addIcons({
      'add': add,
      'chatbubbles-outline': chatbubblesOutline,
      'person-circle': personCircle,
      'image-outline': imageOutline
    });
  }

  handleSearch(event: any) {
    if (event.key === 'Enter') {
      this.openSearchModal();
    }
  }

  openSearchModal() {
    this.isSearchModalOpen = true;
  }

  openFabModal() {
    this.isFabModalOpen = true;
  }

  closeFabModal() {
    this.isFabModalOpen = false;
  }

  closeSearchModal() {
    this.isSearchModalOpen = false;
  }

  submitPost() {
    if (this.newPostDescription.trim()) {
      console.log('Publicación creada:', this.newPostDescription);
      this.closeFabModal();
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  cancel() {
    this.closeFabModal();
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  truncateText(text: string, limit: number = 40): string {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  }

  protected readonly confirm = confirm;
}
