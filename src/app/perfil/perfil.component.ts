import { Component, OnInit } from '@angular/core';
import {IonCol, IonContent, IonGrid, IonRow} from "@ionic/angular/standalone";
import {Ima0Component} from "../ima0/ima0.component";
import {LabelComponent} from "../label/label.component";
import {PublicacionComponent} from "../publicacion/publicacion.component";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    Ima0Component,
    LabelComponent,
    PublicacionComponent,
    IonGrid,
    IonRow,
    IonCol
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
      this.m_seguidores_s = (this.m_seguidores_i / 1000).toFixed(1) + 'K';

    else if (this.m_seguidores_i > 999)
      this.m_seguidores_s = (this.m_seguidores_i / 1000000).toFixed(1) + 'M';

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
