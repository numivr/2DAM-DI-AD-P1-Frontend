import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";

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

  ngOnInit() {}

}
