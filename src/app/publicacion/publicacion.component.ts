import { Component, OnInit } from '@angular/core';
import {ComponentePublicacionComponent} from "../componentes/componente-publicacion/componente-publicacion.component";
import {NgIf} from "@angular/common";
import {IonContent} from "@ionic/angular/standalone";

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss'],
  standalone: true,
    imports: [
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardContent,
        IonRow,
        ComponentePublicacionComponent
    ]
})
export class PublicacionComponent  implements OnInit
{
  constructor() { }
  ngOnInit() {}

  m_nombre_s: string = '@Lucas';
  m_texto_s: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim rhoncus mi in vulputate. Sed suscipit, diam vel tincidunt consequat, tortor aliquet turpis, sed elementum nibh mauris sit amet elit. ';
  m_image_s: string = "";
}
