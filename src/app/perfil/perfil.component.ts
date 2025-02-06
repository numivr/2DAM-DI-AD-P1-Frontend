import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ComponentePublicacionComponent } from '../componentes/componente-publicacion/componente-publicacion.component';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import { RouterLink } from '@angular/router';
import {addIcons} from "ionicons";
import {add, chatbubblesOutline, personCircle} from "ionicons/icons";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ComponentePublicacionComponent,
    NgIf,
    NgOptimizedImage,
    RouterLink,
    NgForOf
  ]
})
export class PerfilComponent implements OnInit
{
  constructor() { }

  // Declaraciones //
  m_nombre_s: string = '@Lucas';
  m_tipo_s: string = 'Border Collie';

  private m_seguidores_i: number = 197000;
  private m_seguidos_i: number = 123000;
  m_seguidores_s: string = "";
  m_seguidos_s: string = "";

  publicacionesEjemplo =
  [
    {
      url: 'https://picsum.photos/80/80?random=3',
      alt: 'Perro',
      texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim rhoncus mi in vulputate. Sed suscipit, diam vel tincidunt consequat, tortor aliquet turpis, sed elementum nibh mauris sit amet elit. ',
      likes: 321,
      comentarios: 12
    },
    {
      url: 'https://picsum.photos/80/80?random=3',
      alt: 'Perro',
      texto: '¡Hola! Soy Lucas, un Border Collie muy juguetón y amigable.',
      likes: 123,
      comentarios: 5
    },
    {
      url: 'https://picsum.photos/80/80?random=3',
      alt: 'Perro',
      texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim rhoncus mi in vulputate. Sed suscipit, diam vel tincidunt consequat, tortor aliquet turpis, sed elementum nibh mauris sit amet elit. ',
      likes: 52,
      comentarios: 8
    },
    {
      url: 'https://picsum.photos/80/80?random=3',
      alt: 'Lemur',
      texto: '¡Hola! Soy Lucas, un Border Collie muy juguetón y amigable.',
      likes: 234,
      comentarios: 8
    },
    {
      url: 'https://picsum.photos/80/80?random=3',
      alt: 'Gato',
      texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim rhoncus mi in vulputate. Sed suscipit, diam vel tincidunt consequat, tortor aliquet turpis, sed elementum nibh mauris sit amet elit. ',
      likes: 432,
      comentarios: 12
    },
    {
      url: 'https://picsum.photos/80/80?random=3',
      alt: 'Patata',
      texto: '¡anfasfjkbiaf!.',
      likes: 1,
      comentarios: 1
    }
  ];

  ngOnInit()
  {
    addIcons({
      'add': add,
      'chatbubbles-outline': chatbubblesOutline,
      'person-circle': personCircle,
    });

    if (this.m_seguidores_i > 999999)
      this.m_seguidores_s = (this.m_seguidores_i / 1000000).toFixed(1) + 'M';

    else if (this.m_seguidores_i > 999)
      this.m_seguidores_s = (this.m_seguidores_i / 1000).toFixed(1) + 'K';

    else
      this.m_seguidores_s = this.m_seguidores_i.toString();


    if (this.m_seguidos_i > 999999)
      this.m_seguidos_s = (this.m_seguidos_i / 1000000).toFixed(1) + 'M';

    else if (this.m_seguidos_i > 999)
      this.m_seguidos_s = (this.m_seguidos_i / 1000).toFixed(1) + 'K';

    else
      this.m_seguidos_s = this.m_seguidos_i.toString();


  }
}
