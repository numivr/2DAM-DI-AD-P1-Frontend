import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {addIcons} from "ionicons";
import {add, arrowForwardOutline, chatbubblesOutline, personCircle} from "ionicons/icons";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-registro-cuenta',
    templateUrl: './registro-cuenta.component.html',
    styleUrls: ['./registro-cuenta.component.scss'],
    standalone: true,
  imports: [
    IonicModule,
    RouterLink
  ]
})
export class RegistroCuentaComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
    addIcons({
      'arrow-forward-outline': arrowForwardOutline,
    });
  }

}
