import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";
import {addIcons} from "ionicons";
import {chatbubbleOutline, heart, heartOutline} from "ionicons/icons";

@Component({
  selector: 'app-componente-publicacion',
  templateUrl: './componente-publicacion.component.html',
  styleUrls: ['./componente-publicacion.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    RouterLink
  ]
})
export class ComponentePublicacionComponent  implements OnInit {

  isFavorite: boolean = false;

  constructor() { }

  async toggleFavorite() {
    this.isFavorite = !this.isFavorite; // Alterna entre true y false
    console.log("Estado cambiado a:", this.isFavorite); // Debug
  }


  ngOnInit() {
    addIcons({
      'heart-outline': heartOutline,
      'chatbubble-outline': chatbubbleOutline,
      'heart': heart,
    })

  }

}
