import { Component, OnInit } from '@angular/core';
import {IonBackButton, IonButton, IonCol, IonContent, IonGrid, IonRow} from "@ionic/angular/standalone";
import {PublicacionComponent} from "../publicacion/publicacion.component";
import {ComponentePublicacionComponent} from "../componentes/componente-publicacion/componente-publicacion.component";
import {IonicModule} from "@ionic/angular";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    PublicacionComponent,
    IonGrid,
    IonRow,
    IonCol,
    ComponentePublicacionComponent,
    IonBackButton,
    IonButton,
    IonicModule,
    NgIf
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

  ngOnInit()
  {
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
