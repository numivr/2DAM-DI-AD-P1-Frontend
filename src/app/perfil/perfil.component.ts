import { Component, OnInit } from '@angular/core';
import {IonContent} from "@ionic/angular/standalone";
import {Ima0Component} from "../ima0/ima0.component";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    Ima0Component
  ]
})
export class PerfilComponent
{
  constructor() { }


}
