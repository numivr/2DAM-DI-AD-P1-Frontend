import { Component, OnInit } from '@angular/core';
import { ComponentePublicacionComponent } from '../componentes/componente-publicacion/componente-publicacion.component';
import { NgForOf, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {ActivatedRoute, RouterLink} from "@angular/router";
import { PublicacionService } from "../1-Servicios/publicacion.service";
import { Publicacion } from "../1-Modelos/Publicacion";
import { Comentario } from '../1-Modelos/Comentario';
import { FormsModule } from '@angular/forms';
import {arrowForward, chatbubbleOutline, heart, heartOutline, send, trashOutline} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ComentarioService } from "../1-Servicios/comentario.service";
import { DelFun} from "../1-Servicios/DelFun";
import {PerfilService} from "../1-Servicios/perfil.service";
import {Perfil} from "../1-Modelos/Perfil";


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
    RouterLink,
  ]
})
export class PublicacionComponent  implements OnInit
{

  _perfilLogueado_Perfil!: Perfil;
  publicacion: Publicacion = new Publicacion();

  _yoMismo_b: boolean = false;
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
    private perfilService: PerfilService,
    private comentarioService: ComentarioService,
    protected delFun: DelFun
  ) { }

  ngOnInit()
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.sacarPublicacion(id);

    addIcons
    ({
      'heart': heart,
      'send': send,
      'trash-outline': trashOutline,
      'heart-outline': heartOutline,
      'chatbubble-outline': chatbubbleOutline,
      'arrow-forward': arrowForward
    });
  }

  continuarOnInit()
  {
    if (this.publicacion)
    {
      this.isFavorite = this.publicacion.liked;
      this.likes = this.publicacion.numLikes;
      this.comentarios = Number(this.publicacion.numComentarios);
      this._nombre_s = this.publicacion.perfil == '' ? 'Error.' : ("@" + this.publicacion.perfil);
      this._texto_s = this.publicacion.texto;
      this._imagePerfil_s = (this.publicacion.fotoPerfil == '' || !this.publicacion.fotoPerfil) ? 'assets/persona_placeholder.jpg' : this.publicacion.fotoPerfil;
      this._image_s = this.publicacion.fotoPublicacion == '' ? 'assets/perro_placeholder.jpg' : this.publicacion.fotoPublicacion;
    }
  }


  sacarPublicacion(_id_i: number)
  {
    this.publicacionService.obtenerPublicacionPorId(_id_i).subscribe({
      next: (data) =>
      {
        console.log("✅ Publicación obtenida:", data);
        this.publicacion = data
      },
      complete: () =>
      {
        this.obtenerPerfilLoggeado();
        this.continuarOnInit()
      },
      error: (error) => console.error(`❌ (fronted) Error al obtener la publicación con ID ${_id_i}:`, error),
    });
  }

  obtenerPerfilLoggeado()
  {
    this.perfilService.obtenerPerfilLoggeado().subscribe({
      next: (data) => this._perfilLogueado_Perfil = data,
      error: (error) => console.error('❌ (fronted) Error al obtener el perfil:', error),
      complete: () =>
      {
        this._yoMismo_b = this.publicacion.perfil == this._perfilLogueado_Perfil.nombre;
        this._admin_b = this._perfilLogueado_Perfil.esAdmin;
      }
    });
  }

  async toggleFavorite()
  {
    if (!this.publicacion)
      return;

    this.isFavorite = !this.isFavorite;
    this.publicacion.numLikes = this.isFavorite
      ? this.publicacion.numLikes + 1
      : this.publicacion.numLikes - 1;

    if (this.isFavorite)
    {
      this.publicacionService.darLike(this.publicacion.id).subscribe({
        next: () =>             console.log("✅ Like dado."),
        error: (error) => console.error('❌ (fronted) Error al dar like:', error)
      });
    }
    else
    {
      this.publicacionService.quitarLike(this.publicacion.id).subscribe({
        next: () =>             console.log("✅ Like quitado."),
        error: (error) => console.error('❌ (fronted) Error al quitar like:', error)
      });
    }
    this.sacarPublicacion(this.publicacion.id);
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

    this.comentarioService.crearComentario(this.publicacion.id, this.nuevoComentario).subscribe({
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

    this.sacarPublicacion(this.publicacion.id);
  }
}
