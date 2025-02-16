import {booleanAttribute, Component, Input, numberAttribute, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {addIcons} from "ionicons";
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {PublicacionService} from "../../1-Servicios/publicacion.service";
import {chatbubbleOutline, heart, heartOutline, trashOutline} from "ionicons/icons";

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
  // @Input() idPublicacion: number = 0;   // NO SE USA
  // @Input() nombreUsuario: string = "";  // NO SE USA
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
  @Input() btnTexto: string = 'Banear'; // Texto del botón de administrador
  @Input() btnFuncion: (datos: any[]) => void = () => {}; // Función del botón de administrador
  @Input() datos: any[] = []; // pila de datos para la funcion



  constructor
  (
    private publicacionService: PublicacionService,
    private router: Router
  ) { }

  async toggleFavorite()
  {
    this.isFavorite = !this.isFavorite; // Alterna entre true y false
    console.log("Estado cambiado a:", this.isFavorite); // Debug
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

}
