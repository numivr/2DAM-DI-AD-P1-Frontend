import {Component, Input, numberAttribute, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {addIcons} from "ionicons";
import {chatbubbleOutline, heart, heartOutline} from "ionicons/icons";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {PublicacionService} from "../../1-Servicios/publicacion.service";

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
  @Input() id: number = 0;
  @Input() enlaceUsuario: string = '#';
  @Input() enlace: string = '#';
  @Input() isFavorite: boolean = false;
  @Input() url: string|null = null;
  @Input() alt: string|null = '';
  m_miNombre_s: string|null = "";
  @Input() nombre: string|null = "";
  @Input() texto: string = 'texto de ejemplo';
  @Input({transform: numberAttribute}) likes: number = 0;
  @Input({transform: numberAttribute}) comentarios: number|null = null;

  @Input() miUrl: string|null = null;

  constructor(private publicacionService: PublicacionService) { }

  toggleFavorite() {
    console.log("🟡 Click en like - ID de la publicación:", this.id);

    if (!this.id) {
      console.error("❌ Error: No se recibió un ID válido para la publicación.");
      return;
    }

    // Alternar estado y actualizar número de likes
    this.isFavorite = !this.isFavorite;
    this.likes = this.isFavorite ? this.likes + 1 : this.likes - 1;

    if (this.isFavorite) {
      console.log("🔼 Dando like...");
      this.publicacionService.darLike(this.id).subscribe({
        next: () => console.log("✅ Like agregado en el servidor"),
        error: (err) => console.error("❌ Error al dar like:", err)
      });
    } else {
      console.log("🔽 Quitando like...");
      this.publicacionService.quitarLike(this.id).subscribe({
        next: () => console.log("✅ Like quitado en el servidor"),
        error: (err) => console.error("❌ Error al quitar like:", err)
      });
    }
  }







  ngOnInit() {



    addIcons({
      'heart-outline': heartOutline,
      'chatbubble-outline': chatbubbleOutline,
      'heart': heart,
    })

    this.m_miNombre_s = '@' + (this.nombre !== null ? this.nombre : null);

    console.log(this.url);
  }

}
