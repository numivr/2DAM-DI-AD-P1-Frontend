import { Component, OnInit } from '@angular/core';
import { ComponentePublicacionComponent } from '../componentes/componente-publicacion/componente-publicacion.component';
import {NgForOf, NgIf} from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {ActivatedRoute} from "@angular/router";
import {PublicacionService} from "../1-Servicios/publicacion.service";
import {Publicacion} from "../1-Modelos/Publicacion";

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ComponentePublicacionComponent,
    NgIf,
    NgForOf
  ]
})
export class PublicacionComponent  implements OnInit
{

  publicacion!: Publicacion;

  _admin_b: boolean = false;
  m_nombre_s: string = '@Lucas';
  m_texto_s: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim rhoncus mi in vulputate. Sed suscipit, diam vel tincidunt consequat, tortor aliquet turpis, sed elementum nibh mauris sit amet elit. ';
  m_image_s: string = "";

  isFavorite: boolean = false;
  likes: number|null = null;
  comentarios: number|null = null;


  constructor(private route: ActivatedRoute,
              private publicacionService: PublicacionService) { }

  ngOnInit()
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.publicacionService.obtenerPublicacionPorId(id).subscribe({
      next: (data) => {
        this.publicacion = data;
        console.log("✅ Publicación recibida:", this.publicacion); // 🔍 Verifica si comentarios llegan
      },
      error: (error) => {
        console.error(`❌ Error al obtener la publicación con ID ${id}:`, error);
      }
    });


    // TODO: quitar estos datos de ejemplo.
    // Ejemplo de datos de publicación.
    this.likes = 10;
    this.comentarios = 5;
  }

  async toggleFavorite() {
    this.isFavorite = !this.isFavorite; // Alterna entre true y false
    console.log("Estado cambiado a:", this.isFavorite); // Debug
  }



  ejeBan(id:number)
  {
    console.log("Ejemplo de ban: " + id);
  }

  BanearComentario(datos: any[])
  {
    console.log("Comentario baneado con id: " + datos[0]);
  }
}
