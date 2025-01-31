import { Component, OnInit } from '@angular/core';
import {IonCard, IonCardContent, IonCardHeader, IonContent, IonRow} from "@ionic/angular/standalone";
import {ComponentePublicacionComponent} from "../componentes/componente-publicacion/componente-publicacion.component";

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
