import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { addIcons } from "ionicons";
import { chatbubbleOutline, heart, heartOutline } from "ionicons/icons";
import { NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";

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
/* No tocar nada de los demas */
export class ComponentePublicacionComponent implements OnInit {
  @Input() perfil: string | null = null;  // Nombre del creador
  @Input() fotoPerfil: string | null = null;  // URL de la foto de perfil
  @Input() texto: string = 'Texto de ejemplo';
  @Input() fotoPublicacion: string | null = null; // URL de la imagen de la publicación
  @Input() numLikes: number | null = 0;
  @Input() numComentarios: number | null = 0;
  @Input() liked: boolean = false;

  constructor() { }

  async toggleFavorite() {
    this.liked = !this.liked; // Alterna entre true y false
    this.numLikes = this.liked ? (this.numLikes || 0) + 1 : (this.numLikes || 1) - 1;
  }

  ngOnInit() {
    addIcons({
      'heart-outline': heartOutline,
      'chatbubble-outline': chatbubbleOutline,
      'heart': heart,
    });
  }
}
