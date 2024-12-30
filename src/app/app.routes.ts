import { Routes } from '@angular/router';
import {InicioComponent} from "./inicio/inicio.component";
import {RegistroComponent} from "./registro/registro.component";
import {PrincipalComponent} from "./principal/principal.component";
import {PerfilComponent} from "./perfil/perfil.component";
import {PerfilPropioComponent} from "./perfil-propio/perfil-propio.component";
import {ChatComponent} from "./chat/chat.component";

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },


  {
    path: 'inicio',
    component: InicioComponent,
  },
  {
    path: 'registro',
    component: RegistroComponent,
  },
  {
    path: 'principal/:idUsuario',
    component: PrincipalComponent,
  },
  {
    path: 'perfil',
    component: PerfilComponent,
  },
  {
    path: 'perfil_propio/:idUsuario',
    component: PerfilPropioComponent,
  },
  {
    path: 'chat/:idUsuario',
    component: ChatComponent,
  },


  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full',
  },
];
