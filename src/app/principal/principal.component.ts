import {Component, ElementRef, ViewChild, Renderer2, OnInit} from '@angular/core';
import {AlertController, IonicModule} from "@ionic/angular";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {add, chatbubblesOutline, personCircle} from "ionicons/icons";
import {addIcons} from "ionicons";
import {Usuario} from "../models/Usuario";
import {Publicacion} from "../models/Publicacion";
import {ComponentePublicacionComponent} from "../componentes/componente-publicacion/componente-publicacion.component";
import {RouterLink} from "@angular/router";




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
  @ViewChild('modal', { static: true }) modal!: ElementRef;
  selectedSegment: string = 'Recomendado';
  usuarios: Usuario[] = [];
  publicaciones: Publicacion[] = [];

  public alertInputs = [
    {
      type: 'textarea' as const,
      placeholder: 'Escribe tu publicación',
      attributes: {
        rows: 15,
        cols: 35
      }
    },
  ];

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡Cuéntanos!',
      inputs: this.alertInputs,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Publicar',
          handler: (data) => {
            console.log('Publicación:', data);
          }
        }
      ]
    });

    await alert.present();
  }

  constructor(private alertController: AlertController) {}

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
    this.renderer.setStyle(this.modal.nativeElement, 'visibility', 'visible');
    this.renderer.setStyle(this.modal.nativeElement, 'height', '50%');
    this.isModalOpen = true; // Abre el modal
  }

  closeModal() {
    this.isModalOpen = false; // Cierra el modal
    this.renderer.setStyle(this.modal.nativeElement, 'visibility', 'hidden');
    this.renderer.setStyle(this.modal.nativeElement, 'height', '0');
  }

  truncateText(text: string, limit: number = 40): string {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  }
}
