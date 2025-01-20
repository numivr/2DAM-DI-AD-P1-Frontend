import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-registro-cualidades',
    templateUrl: './registro-cualidades.component.html',
    styleUrls: ['./registro-cualidades.component.scss'],
    standalone: true,
  imports: [
    IonicModule,
    RouterLink
  ]
})
export class RegistroCualidadesComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
