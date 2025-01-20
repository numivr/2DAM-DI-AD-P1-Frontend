import {Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgOptimizedImage} from "@angular/common";
import {add, chatbubblesOutline, personCircle} from "ionicons/icons";
import {addIcons} from "ionicons";
import {Usuario} from "../models/Usuario";
import {Publicacion} from "../models/Publicacion";

@Component({
    selector: 'app-principal',
    templateUrl: './principal.component.html',
    styleUrls: ['./principal.component.scss'],
    standalone: true,
    imports: [
        IonicModule,
        NgOptimizedImage
    ]
})
export class PrincipalComponent implements OnInit {
    constructor() {
    }

    usuarios: Usuario[] = [];
    publicaciones: Publicacion[] = [];


    ngOnInit() {
        addIcons({
            'add': add,
            'chatbubbles-outline': chatbubblesOutline,
            'person-circle': personCircle,
        });
    }

}
