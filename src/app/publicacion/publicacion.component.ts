import { Component, OnInit } from '@angular/core';
import { ComponentePublicacionComponent } from '../componentes/componente-publicacion/componente-publicacion.component';
import { NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ComponentePublicacionComponent,
    NgIf
  ]
})
export class PublicacionComponent  implements OnInit
{
  constructor() { }
  ngOnInit()
  {
    this.likes = 0;
    this.comentarios = 0;
  }

  async toggleFavorite() {
    this.isFavorite = !this.isFavorite; // Alterna entre true y false
    console.log("Estado cambiado a:", this.isFavorite); // Debug
  }


  _admin_b: boolean = false;
  m_nombre_s: string = '@Lucas';
  m_texto_s: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim rhoncus mi in vulputate. Sed suscipit, diam vel tincidunt consequat, tortor aliquet turpis, sed elementum nibh mauris sit amet elit. ';
  m_image_s: string = "";

  isFavorite: boolean = false;
  likes: number|null = null;
  comentarios: number|null = null;


  ejeBan(id:number)
  {
    console.log("Ejemplo de ban: " + id);
  }

  BanearComentario(datos: any[])
  {
    console.log("Comentario baneado con id: " + datos[0]);
  }
}
