import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicModule, IonModal} from '@ionic/angular';
import {add, chatbubblesOutline, imageOutline, personCircle} from 'ionicons/icons';
import {addIcons} from 'ionicons';
import {Publicacion} from '../1-Modelos/Publicacion';
import {ComponentePublicacionComponent} from '../componentes/componente-publicacion/componente-publicacion.component';
import {RouterLink} from '@angular/router';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {FormsModule} from "@angular/forms";
import { PublicacionService } from '../1-Servicios/publicacion.service';



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
    FormsModule,
    NgForOf
  ],
})
export class PrincipalComponent implements OnInit {
  selectedSegment: string = 'Recomendado';
  publicaciones: Publicacion[] = [];
  isSearchModalOpen: boolean = false;
  isFabModalOpen: boolean = false;
  searchTerm: string = '';
  newPostTitle: string = '';
  newPostDescription: string = '';

  constructor(private publicacionService: PublicacionService) {}

  @ViewChild('crearPublicacionModal') modal!: IonModal;

  ngOnInit() {
    addIcons({
      'add': add,
      'chatbubbles-outline': chatbubblesOutline,
      'person-circle': personCircle,
      'image-outline': imageOutline
    });
    this.cargarPublicaciones();
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

  cargarPublicaciones() {
    this.publicacionService.obtenerPublicaciones().subscribe({
      next: (data: any) => { // Cambia la desestructuración incorrecta
        this.publicaciones = data;
      },
      error: (err) => {
        console.error('Error al obtener publicaciones:', err);
      },
      complete: () => {
        console.log('Carga de publicaciones completada');
      }
    });
  }



}
