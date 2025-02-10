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
    NgOptimizedImage,
    RouterLink,
    NgForOf
  ]
})
export class PerfilComponent implements OnInit
{

  perfil!: Perfil;
  publicaciones: Publicacion[] = []

  constructor( private perfilService: PerfilService) {}

  // Declaraciones //
  m_nombre_s: string = '@Lucas';
  m_tipo_s: string = 'Border Collie';

  private m_seguidores_i: number = 197000;
  private m_seguidos_i: number = 123000;
  m_seguidores_s: string = "";
  m_seguidos_s: string = "";


  ngOnInit()
  {
    this.obtenerPerfilLoggeado();
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
}
