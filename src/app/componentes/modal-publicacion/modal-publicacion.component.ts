import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Publicacion} from "../../1-Modelos/Publicacion";
import {PublicacionService} from "../../1-Servicios/publicacion.service";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter, IonIcon,
  IonInput,
  IonItem, IonModal, IonTextarea,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {FormsModule} from "@angular/forms";
import {addIcons} from "ionicons";
import {add, camera, chatbubblesOutline, imageOutline, personCircle} from "ionicons/icons";
import {NgIf} from "@angular/common";

@Component
({
  selector: 'app-modal-publicacion',
  templateUrl: './modal-publicacion.component.html',
  styleUrls: ['./modal-publicacion.component.scss'],
  imports: [
    IonButton,
    IonFooter,
    IonItem,
    IonInput,
    FormsModule,
    IonButtons,
    IonToolbar,
    IonContent,
    IonTitle,
    IonModal,
    IonIcon,
    IonTextarea,
    NgIf
  ],
  standalone: true
})

export class ModalPublicacionComponent  implements OnInit
{
  @Input() isFabModalOpen: boolean = false;
  @ViewChild('crearPublicacionModal') modal!: IonModal;
  @ViewChild('fileInput') fileInput!: ElementRef;

  selectedSegment: string = 'Recomendado';
  publicaciones: Publicacion[] = [];
  publicacionesSeguidos: Publicacion[] = [];
  isSearchModalOpen: boolean = false;
  searchTerm: string = '';
  newPostDescription: string = ''; // Texto de la publicación
  newPostImage: string = ''; // URL de la imagen de la publicación

  constructor(private publicacionService: PublicacionService) {}




  ngOnInit()
  {
    addIcons
    ({
      'add': add,
      'chatbubbles-outline': chatbubblesOutline,
      'person-circle': personCircle,
      'image-outline': imageOutline,
      'camera': camera
    });
  }


  handleSearch(event: any) {
    if (event.key === 'Enter') {
      this.openSearchModal();
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

}
