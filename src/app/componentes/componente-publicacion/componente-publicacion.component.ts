import { Component, OnInit } from '@angular/core';
import {IonCard, IonCardContent, IonCardHeader, IonContent, IonRow} from "@ionic/angular/standalone";

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
    IonRow
  ]
})
export class ComponentePublicacionComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
