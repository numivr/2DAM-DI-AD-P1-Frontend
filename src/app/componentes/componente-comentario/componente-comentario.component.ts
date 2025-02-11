import {Component, Input, numberAttribute, OnInit} from '@angular/core';
  import {IonicModule} from "@ionic/angular";
  import {addIcons} from "ionicons";
  import {NgIf} from "@angular/common";
  import {RouterLink} from "@angular/router";
  import {PublicacionService} from "../../1-Servicios/publicacion.service";
  import {chatbubbleOutline, heart, heartOutline, trashOutline} from "ionicons/icons";

  @Component({
    selector: 'app-componente-comentario',
    templateUrl: './componente-comentario.component.html',
    styleUrls: ['./componente-comentario.component.scss'],
    standalone: true,
    imports: [
      IonicModule,
      NgIf,
      RouterLink,
    ]
  })
  export class ComponenteComentarioComponent implements OnInit {
    @Input() id: number = 0;
    @Input() enlaceUsuario: string = '#';
    @Input() enlace: string = '#';
    @Input() url: string|null = null;
    @Input() alt: string|null = '';
    m_miNombre_s: string|null = "";
    @Input() nombre: string|null = "";
    @Input() texto: string = 'texto de ejemplo';
    @Input({transform: numberAttribute}) comentarios: number|null = null;
    @Input() miUrl: string|null = null;

    constructor(private publicacionService: PublicacionService) { }

    ngOnInit() {
      addIcons({
        'heart-outline': heartOutline,
        'chatbubble-outline': chatbubbleOutline,
        'heart': heart,
        'trash-outline': trashOutline,
      });

      this.m_miNombre_s = '@' + (this.nombre !== null ? this.nombre : null);
      console.log(this.url);
    }
  }
