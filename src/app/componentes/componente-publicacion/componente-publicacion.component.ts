import {Component, Input, numberAttribute, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {addIcons} from "ionicons";
import {chatbubbleOutline, heart, heartOutline} from "ionicons/icons";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-componente-publicacion',
  templateUrl: './componente-publicacion.component.html',
  styleUrls: ['./componente-publicacion.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgIf,
    RouterLink,
  ]
})
export class ComponentePublicacionComponent  implements OnInit
{
  @Input() enlaceUsuario: string = '#'; // Enlace al perfil del usuario
  @Input() enlace: string = '#'; // Enlace a la publicación
  @Input() isFavorite: boolean = false; // Indica si la publicación es favorita
  @Input() urlImagen: string|null = null; // URL de la imagen
  m_miNombre_s: string|null = ""; // Nombre del usuario, Porcesado
  @Input() nombre: string|null = null; // Nombre del usuario
  @Input() texto: string = 'texto_ejemplo';  // Texto de la publicación
  @Input({transform: numberAttribute}) likes: number|null = null; // Número de likes
  @Input({transform: numberAttribute}) comentarios: number|null = null; // Número de comentarios

  @Input() miUrl: string|null = null;

  constructor() { }

  async toggleFavorite() {
    this.isFavorite = !this.isFavorite; // Alterna entre true y false
    console.log("Estado cambiado a:", this.isFavorite); // Debug
  }


  ngOnInit() {
    addIcons({
      'heart-outline': heartOutline,
      'chatbubble-outline': chatbubbleOutline,
      'heart': heart,
    })

    this.m_miNombre_s = '@' + (this.nombre !== null ? this.nombre : null);

    // console.log(this.urlImagen);
  }

}
