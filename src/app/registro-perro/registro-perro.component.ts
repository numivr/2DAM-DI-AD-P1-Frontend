import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";
import {addIcons} from "ionicons";
import {arrowForwardOutline} from "ionicons/icons";

@Component({
    selector: 'app-registro-perro',
    templateUrl: './registro-perro.component.html',
    styleUrls: ['./registro-perro.component.scss'],
    standalone: true,
  imports: [
    IonicModule,
    RouterLink
  ]
})
export class RegistroPerroComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
    addIcons({
      'arrow-forward-outline': arrowForwardOutline,
    });
  }
}
