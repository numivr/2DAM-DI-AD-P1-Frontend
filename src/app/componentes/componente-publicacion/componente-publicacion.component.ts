import {booleanAttribute, Component, Input, numberAttribute, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {addIcons} from "ionicons";
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {PublicacionService} from "../../1-Servicios/publicacion.service";
import {chatbubbleOutline, heart, heartOutline, trashOutline} from "ionicons/icons";
import {DelFun} from "../../1-Servicios/DelFun";
import {PerfilService} from "../../1-Servicios/perfil.service";

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
  // --- Identificación --- //
  @Input() idPublicacion: number = -1; // ID de la publicación
  @Input() idComentario: number = -1;  // ID del comentario
  @Input() yoMismo: boolean = false;

  // --- Declaración cabeza --- //
  @Input() enlaceUsuario: string = '#'; // Enlace al perfil del usuario
  @Input() urlImgPerfil: string|null = null; // URL de la imagen de perfil
  @Input() nombre: string|null = null; // Nombre del usuario
  m_miNombre_s: string|null = ""; // Nombre del usuario, Porcesado

  // --- Declaración cuerpo --- //
  @Input() urlImagen: string|null = null; // URL de la imagen
  @Input() texto: string = 'texto_ejemplo';  // Texto de la publicación
  @Input() enlace: string = '#'; // Enlace a la publicación

  // --- Declaración pie --- //
  @Input({transform: numberAttribute}) likes: number|null = null; // Número de likes
  @Input({transform: numberAttribute}) comentarios: number|null = null; // Número de comentarios
  @Input() isFavorite: boolean = false; // Indica si la publicación es favorita

  // --- Declaración de administrador --- //
  @Input({transform: booleanAttribute}) _admin_b: boolean = false; // Indica si el usuario es administrador
  @Input() btnTexto: string = ''; // Texto del botón de administrador
  @Input() btnFuncion: (datos: any[]) => void = () => {}; // Función del botón de administrador
  @Input() datos: any[] = []; // pila de datos para la funcion



  constructor
  (
    private publicacionService: PublicacionService,
    private router: Router,
    protected delFun: DelFun,
    private perfilService: PerfilService,
  ) { }

  sacarPublicacion(_id_i: number)
  {
    this.publicacionService.obtenerPublicacionPorId(_id_i).subscribe
    ({
      next: (data) =>
      {
        console.log("✅ Publicación obtenida:", data);
        this.likes = data.numLikes;
        this.comentarios = Number(data.numComentarios);
        this.isFavorite = data.liked;
      },
      error: (error) => console.error(`❌ (fronted) Error al obtener la publicación con ID ${_id_i}:`, error),
    });
  }

  async toggleFavorite()
  {
    this.isFavorite = !this.isFavorite;
    if (this.likes !== null)
      this.likes = (this.isFavorite) ? this.likes + 1 : this.likes - 1;


    if (this.isFavorite)
    {
      this.publicacionService.darLike(this.idPublicacion).subscribe
      ({
        next: () =>             console.log("✅ Like dado."),
        error: (error) => console.error('❌ (fronted) Error al dar like:', error)
      });
    }
    else
    {
      this.publicacionService.quitarLike(this.idPublicacion).subscribe
      ({
        next: () =>             console.log("✅ Like quitado."),
        error: (error) => console.error('❌ (fronted) Error al quitar like:', error)
      });
    }

    this.sacarPublicacion(this.idPublicacion);
  }


  ngOnInit()
  {
    addIcons
    ({
      'heart-outline': heartOutline,
      'chatbubble-outline': chatbubbleOutline,
      'heart': heart,
      'trash-outline': trashOutline,
    })
    this.m_miNombre_s = '@' + (this.nombre !== null ? this.nombre : null);
  }

  ejeFuncion()
  {
    if (this.btnFuncion)
    {
      this.btnFuncion(this.datos);
    }
  }

  borrar()
  {
    if ((this.idPublicacion === -1 || this.idComentario === -1) && (this.idPublicacion !== -1 && this.idComentario !== -1))
      return;

    else if (this.idPublicacion !== -1)
      this.delFun.borraPublicacion([this.idPublicacion]);

    else
      this.delFun.borraComentario([this.idComentario]);
  }

}
