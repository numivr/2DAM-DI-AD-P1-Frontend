import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ComponentePublicacionComponent } from '../componentes/componente-publicacion/componente-publicacion.component';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import { RouterLink } from '@angular/router';
import {addIcons} from "ionicons";
import {add, chatbubblesOutline, personCircle} from "ionicons/icons";
import {Perfil} from "../1-Modelos/Perfil";
import {Publicacion} from "../1-Modelos/Publicacion";
import {PerfilService} from "../1-Servicios/perfil.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ComponentePublicacionComponent,
    NgIf,
    NgForOf
  ]
})
export class PerfilComponent implements OnInit
{
  constructor( private perfilService: PerfilService) {}

  _admin_b: boolean = true;

  perfil!: Perfil;
  publicaciones: Publicacion[] = []


  // Declaraciones //
  nombre: string = 'Lucas';
  _nombre_s: string = '';

  _tipo_s: string = 'Border Collie';
  _yoMismo_b: boolean = false;

  private m_seguidores_i: number = 197000;
  private m_seguidos_i: number = 123000;
  _seguidores_s: string = "";
  _seguidos_s: string = "";

  publicacionesEjemplo =
  [
    {
      id: 1,
      url: 'https://picsum.photos/80/80?random=3',
      texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim rhoncus mi in vulputate. Sed suscipit, diam vel tincidunt consequat, tortor aliquet turpis, sed elementum nibh mauris sit amet elit. ',
      likes: 321,
      comentarios: 12
    },
    {
      id: 2,
      url: 'https://picsum.photos/80/80?random=3',
      texto: '¡Hola! Soy Lucas, un Border Collie muy juguetón y amigable.',
      likes: 123,
      comentarios: 5
    },
    {
      id: 3,
      url: 'https://picsum.photos/80/80?random=3',
      texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim rhoncus mi in vulputate. Sed suscipit, diam vel tincidunt consequat, tortor aliquet turpis, sed elementum nibh mauris sit amet elit. ',
      likes: 52,
      comentarios: 8
    },
    {
      id: 4,
      url: 'https://picsum.photos/80/80?random=3',
      texto: '¡anfasfjkbiaf!.',
      likes: 1,
      comentarios: 1
    }
  ];

  ngOnInit()
  {
    this.obtenerPerfilLoggeado();
    addIcons({
      'add': add,
      'chatbubbles-outline': chatbubblesOutline,
      'person-circle': personCircle,
    });

    this._nombre_s = '@' + this.nombre;

    if (true) // comrpobar si es el usuario estrando a su perfil.
      this._yoMismo_b = true;


    if (this.m_seguidores_i > 999999)
      this._seguidores_s = (this.m_seguidores_i / 1000000).toFixed(1) + 'M';

    else if (this.m_seguidores_i > 999)
      this._seguidores_s = (this.m_seguidores_i / 1000).toFixed(1) + 'K';

    else
      this._seguidores_s = this.m_seguidores_i.toString();


    if (this.m_seguidos_i > 999999)
      this._seguidos_s = (this.m_seguidos_i / 1000000).toFixed(1) + 'M';

    else if (this.m_seguidos_i > 999)
      this._seguidos_s = (this.m_seguidos_i / 1000).toFixed(1) + 'K';

    else
      this._seguidos_s = this.m_seguidos_i.toString();


  }
  obtenerPerfilLoggeado() {
    this.perfilService.obtenerPerfilLoggeado().subscribe({
      next: (data) => {
        this.perfil = new Perfil(
          data.nombre,
          data.numeroSeguidores,
          data.numeroSeguidos,
          data.raza,
          data.fotoPerfil,
          data.publicaciones
        );

        this.publicaciones = this.perfil.publicaciones;
      },
      error: (error) => {
        console.error('❌ Error al obtener el perfil:', error);
      }
    });

  }

  ejeBan(id:number)
  {
    console.log("Ejemplo de ban: " + id);
  }

  seguir()
  {
    console.log("Seguir");
  }

  banearPublicacion(datos: any[])
  {
    console.log("Publicación baneada con id: " + datos[0]);
  }

}
