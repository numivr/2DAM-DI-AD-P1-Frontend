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
    ComponentePublicacionComponent,
    NgIf,
    IonContent
  ]
})
export class PublicacionComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
