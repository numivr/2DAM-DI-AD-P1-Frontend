import { Component, OnInit } from '@angular/core';
import { ComponentePublicacionComponent } from '../componentes/componente-publicacion/componente-publicacion.component';
import { ComponenteComentarioComponent } from '../componentes/componente-comentario/componente-comentario.component';
import {NgForOf, NgIf} from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {ActivatedRoute} from "@angular/router";
import {PublicacionService} from "../1-Servicios/publicacion.service";
import {Publicacion} from "../1-Modelos/Publicacion";
import { Comentario } from '../1-Modelos/Comentario';
import { FormsModule } from '@angular/forms';
import { send } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import {ComentarioService} from "../1-Servicios/comentario.service";

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ComponentePublicacionComponent,
    ComponenteComentarioComponent,
    NgIf,
    NgForOf,
    FormsModule,
  ]
})
export class PublicacionComponent  implements OnInit
{

  publicacion!: Publicacion;
  comentario!: Comentario;
  nuevoComentario: string = '';


  constructor(private route: ActivatedRoute,
              private publicacionService: PublicacionService,
              private comentarioService: ComentarioService) { }

  ngOnInit() {
    addIcons({
      'send': send,
    });

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

  }

  async toggleFavorite() {
    this.isFavorite = !this.isFavorite; // Alterna entre true y false
    console.log("Estado cambiado a:", this.isFavorite); // Debug
  }



  /**
   * ✅ Método para publicar un comentario
   */
  publicarComentario() {
    if (!this.nuevoComentario.trim()) {
      alert('❌ El comentario no puede estar vacío.');
      return;
    }

    this.comentarioService.crearComentario(this.publicacion.id, this.nuevoComentario).subscribe({
      next: (comentario) => {
        console.log("✅ Comentario publicado:", comentario);
        this.publicacion.comentarios.push(comentario);  // 📌 Agregar el comentario en tiempo real
        this.nuevoComentario = '';  // Limpiar el campo de entrada
      },
      error: (error) => {
        console.error('❌ Error al publicar el comentario:', error);
        alert('Hubo un error al publicar el comentario. Inténtalo de nuevo.');
      }
    });
  }

  isFavorite: boolean = false;
  likes: number|null = 10;
  comentarios: number|null = 10;
}
