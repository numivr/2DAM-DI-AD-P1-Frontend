import { Component, OnInit } from '@angular/core';
import { ComponentePublicacionComponent } from '../componentes/componente-publicacion/componente-publicacion.component';
import { NgForOf, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from "@angular/router";
import { PublicacionService } from "../1-Servicios/publicacion.service";
import { Publicacion } from "../1-Modelos/Publicacion";
import { Comentario } from '../1-Modelos/Comentario';
import { FormsModule } from '@angular/forms';
import { send } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ComentarioService } from "../1-Servicios/comentario.service";
import { DelFun} from "../1-Servicios/DelFun";


@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ComponentePublicacionComponent,
    NgIf,
    FormsModule,
    NgForOf,
  ]
})
export class PublicacionComponent  implements OnInit
{

  publicacion!: Publicacion;

  _admin_b: boolean = false;
  _nombre_s: string = '';
  _texto_s: string = '';
  _imagePerfil_s: string = 'assets/persona_placeholder.jpg';
  _image_s: string = 'assets/perro_placeholder.jpg';

  isFavorite: boolean = false;
  likes: number|null = null;
  comentarios: number|null = null;


  comentario!: Comentario;
  nuevoComentario: string = '';


  constructor
  (
    private route: ActivatedRoute,
    private publicacionService: PublicacionService,
    private comentarioService: ComentarioService,
    protected delFun: DelFun
  ) { }

  ngOnInit()
  {
    addIcons
    ({
      'send': send,
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.publicacionService.obtenerPublicacionPorId(id).subscribe
    ({
      next: (data) =>
      {
        this.publicacion = data;
        console.log("✅ Publicación recibida:", this.publicacion); // 🔍 Verifica si comentarios llegan
      },
      complete: () =>
      {
        if (this.publicacion)
        {
          this.likes = this.publicacion.numLikes;
          this.comentarios = Number(this.publicacion.numComentarios);
          this._nombre_s = this.publicacion.perfil == '' ? 'Error.' : ("@" + this.publicacion.perfil);
          this._texto_s = this.publicacion.texto;
          this._imagePerfil_s = (this.publicacion.fotoPerfil == '' || !this.publicacion.fotoPerfil) ? 'assets/persona_placeholder.jpg' : this.publicacion.fotoPerfil;
          this._image_s = this.publicacion.fotoPublicacion == '' ? 'assets/perro_placeholder.jpg' : this.publicacion.fotoPublicacion;

        }
      },
      error: (error) =>
      {
        console.error(`❌ Error al obtener la publicación con ID ${id}:`, error);
      }
    });

  }

  async toggleFavorite()
  {
    this.isFavorite = !this.isFavorite; // Alterna entre true y false
    console.log("Estado cambiado a:", this.isFavorite); // Debug
  }



  /**
   * ✅ Método para publicar un comentario
   */
  publicarComentario()
  {
    if (!this.nuevoComentario.trim())
    {
      alert('❌ El comentario no puede estar vacío.');
      return;
    }

    this.comentarioService.crearComentario(this.publicacion.id, this.nuevoComentario).subscribe
    ({
      next: (comentario) =>
      {
        console.log("✅ Comentario publicado:", comentario);
        this.publicacion.comentarios.push(comentario);  // 📌 Agregar el comentario en tiempo real
        this.nuevoComentario = '';  // Limpiar el campo de entrada
      },
      error: (error) =>
      {
        console.error('❌ Error al publicar el comentario:', error);
        alert('Hubo un error al publicar el comentario. Inténtalo de nuevo.');
      }
    });
  }
}
