import {Component, OnInit} from '@angular/core';
import {AlertController, IonAlert, IonicModule} from "@ionic/angular";
import {NgOptimizedImage} from "@angular/common";
import {add, chatbubblesOutline, personCircle} from "ionicons/icons";
import {addIcons} from "ionicons";
import {Usuario} from "../models/Usuario";
import {Publicacion} from "../models/Publicacion";
import {ComponentePublicacionComponent} from "../componentes/componente-publicacion/componente-publicacion.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgOptimizedImage,
    ComponentePublicacionComponent,
    RouterLink
  ]
})
export class PrincipalComponent implements OnInit {
  constructor(private alertController: AlertController) {
  }

  usuarios: Usuario[] = [];
  publicaciones: Publicacion[] = [];

  public alertButtons = ['OK'];
  public alertInputs = [
    {
      type: 'textarea' as const,
      placeholder: 'Escribe tu publicación',
    },
  ];

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡Cuéntanos!',
      buttons: this.alertButtons,
      inputs: this.alertInputs,
      cssClass: 'custom-alert' // Clase CSS aplicada
    });

    await alert.present();
  }

  ngOnInit() {
    addIcons({
      'add': add,
      'chatbubbles-outline': chatbubblesOutline,
      'person-circle': personCircle,
    });
  }
}
