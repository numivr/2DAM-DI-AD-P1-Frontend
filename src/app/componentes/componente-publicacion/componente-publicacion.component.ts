import {Component, Input, numberAttribute, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {addIcons} from "ionicons";
import {chatbubbleOutline, heart, heartOutline} from "ionicons/icons";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-componente-publicacion',
  templateUrl: './componente-publicacion.component.html',
  styleUrls: ['./componente-publicacion.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgIf,
  ]
})
export class ComponentePublicacionComponent  implements OnInit
{

  @Input() isFavorite: boolean = false;
  @Input() url: string|null = null;
  @Input() alt: string|null = '';
  m_miNombre_s: string|null = "";
  @Input() nombre: string|null = null;
  @Input() texto: string = 'texto_ejemplo';
  @Input({transform: numberAttribute}) likes: number|null = null;
  @Input({transform: numberAttribute}) comentarios: number|null = null;

  @Input() miUrl: string|null = null;

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

    this.m_miNombre_s = '@' + (this.nombre !== null ? this.nombre : null);

    console.log(this.url);
  }

}
