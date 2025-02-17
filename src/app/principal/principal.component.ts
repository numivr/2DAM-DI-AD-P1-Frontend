import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { IonicModule, IonModal } from '@ionic/angular';
import {add, camera, chatbubblesOutline, imageOutline, personCircle} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Publicacion } from '../1-Modelos/Publicacion';
import { ComponentePublicacionComponent } from '../componentes/componente-publicacion/componente-publicacion.component';
import { RouterLink } from '@angular/router';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { PublicacionService } from '../1-Servicios/publicacion.service';
import { ComponenteComentarioComponent } from '../componentes/componente-comentario/componente-comentario.component';
import {PerfilService} from "../1-Servicios/perfil.service";

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
  publicacionesSeguidos: Publicacion[] = [];
  isSearchModalOpen: boolean = false;
  isFabModalOpen: boolean = false;
  searchTerm: string = '';
  newPostDescription: string = ''; // Texto de la publicación
  newPostImage: string = ''; // URL de la imagen de la publicación
  publicacionesBusqueda: Publicacion[] = [];

  usuario?: string; // Nombre del usuario loggeado

  constructor(private publicacionService: PublicacionService, private perfilService: PerfilService) {}

  @ViewChild('crearPublicacionModal') modal!: IonModal;

  @ViewChild('fileInput') fileInput!: ElementRef;

  ngOnInit() {
    addIcons({
      'add': add,
      'chatbubbles-outline': chatbubblesOutline,
      'person-circle': personCircle,
      'image-outline': imageOutline,
      'camera': camera
    });
    this.cargarPublicaciones();
    this.cargarPublicacionesSeguidos();
    this.obtenerPerfilLoggeado(); // ✅ Llamamos al método para obtener el perfil loggeado
  }

  obtenerPerfilLoggeado() {
    this.perfilService.obtenerPerfilLoggeado().subscribe({
      next: (perfil) => {
        this.usuario = perfil.nombre; // ✅ Guardamos el nombre del usuario
      },
      error: (err) => {
        console.error('❌ Error al obtener el perfil loggeado:', err);
      }
    });
  }

  handleSearch(event: any) {
    if (event.key === 'Enter') {
      this.openSearchModal();
      this.buscarPalabras();
    }
  }

  buscarPalabras() {
    if (this.searchTerm.trim()) {
      this.publicacionService.buscarPalabras(this.searchTerm).subscribe(
        (publicaciones) => {
          this.publicacionesBusqueda = publicaciones;
        },
        (error) => {
          console.error('Error al buscar publicaciones:', error);
        }
      );
    }
  }




  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  openSearchModal() {
    this.isSearchModalOpen = true;
  }

  closeSearchModal() {
    this.isSearchModalOpen = false;
  }

  openFabModal() {
    this.isFabModalOpen = true;
  }

  closeFabModal() {
    this.isFabModalOpen = false;
  }


  /**
   * ✅ Abre el selector de archivos oculto
   */
  openFilePicker() {
    this.fileInput.nativeElement.click();
  }

  /**
   * ✅ Maneja la selección de la imagen y la convierte a URL
   */
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newPostImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  isUrlModalOpen: boolean = false; // Controla la visibilidad del modal
  imageURL: string = ''; // Guarda la URL ingresada

  /**
   * ✅ Abre el modal para ingresar la URL de la imagen
   */
  openUrlModal() {
    this.isUrlModalOpen = true;
  }


  /**
   * ✅ Permite ingresar una URL manualmente para la imagen y la muestra en la interfaz
   */
  addImageFromURL() {
    if (!this.imageURL) {
      alert("❌ La URL ingresada no es válida. Inténtalo de nuevo.");
      return;
    }

    this.newPostImage = this.imageURL;
    this.isUrlModalOpen = false; // Cierra el modal
    this.imageURL = ''; // Limpia el campo de entrada
  }





  /**
   * ✅ Elimina la imagen seleccionada
   */
  removeImage() {
    this.newPostImage = '';
  }

  /**
   * ✅ Enviar la publicación al backend
   */
  submitPost() {
    if (!this.newPostDescription.trim() && !this.newPostImage.trim()) {
      alert('Por favor, introduce texto o una imagen antes de publicar.');
      return;
    }

    const nuevaPublicacion = {
      texto: this.newPostDescription,
      fotoPublicacion: this.newPostImage
    };

    console.log("📢 Publicando...", nuevaPublicacion);

    this.publicacionService.crearPublicacion(nuevaPublicacion).subscribe({
      next: (response) => {
        console.log("✅ Publicación enviada:", response);
        this.publicaciones.unshift(response); // Agregar la nueva publicación al inicio del feed
        this.closeFabModal(); // Cerrar modal
        this.newPostDescription = ''; // Resetear campo
        this.newPostImage = ''; // Resetear imagen
      },
      error: (err) => {
        console.error("❌ Error al enviar publicación:", err);
        alert("Hubo un error al publicar. Inténtalo nuevamente.");
      }
    });
  }

  cargarPublicaciones() {
    this.publicacionService.obtenerPublicaciones().subscribe({
      next: (data: Publicacion[]) => {
        this.publicaciones = data;
      },
      error: (err) => {
        console.error('Error al obtener publicaciones:', err);
      }
    });
  }

  cargarPublicacionesSeguidos() {
    this.publicacionService.obtenerPublicacionesSeguidos().subscribe({
      next: (data: Publicacion[]) => {
        this.publicacionesSeguidos = data;
      },
      error: (err) => {
        console.error('Error al obtener publicaciones de seguidos:', err);
      }
    });
  }

  truncateText(text: string, limit: number = 40): string {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  }
}
