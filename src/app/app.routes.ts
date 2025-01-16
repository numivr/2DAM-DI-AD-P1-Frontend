import { Routes } from '@angular/router';
import {InicioComponent} from "./inicio/inicio.component";
import {ChatMensajesComponent} from "./chat-mensajes/chat-mensajes.component";
import {ChatsPersonasComponent} from "./chats-personas/chats-personas.component";
import {RegistroCualidadesComponent} from "./registro-cualidades/registro-cualidades.component";
import {RegistroPerroComponent} from "./registro-perro/registro-perro.component";
import {RegistroCuentaComponent} from "./registro-cuenta/registro-cuenta.component";
import {PublicacionComponent} from "./publicacion/publicacion.component";
import {PrincipalComponent} from "./principal/principal.component";
import {PerfilComponent} from "./perfil/perfil.component";

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },


  {
    path: 'Inicio',
    component: InicioComponent,
  },
  {
    path: 'ChatMensajes',
    component: ChatMensajesComponent,
  },



  {
    path: 'ChatsPersonas',
    component: ChatsPersonasComponent,
  },
  {
    path: 'RegistroCualidades',
    component: RegistroCualidadesComponent,
  },
  {
    path: 'RegistroPerro',
    component: RegistroPerroComponent,
  },
  {
    path: 'RegistroCuenta',
    component: RegistroCuentaComponent,
  },
  {
    path: 'Publicacion',
    component: PublicacionComponent,
  },
  {
    path: 'Principal',
    component: PrincipalComponent,
  },
  {
    path: 'Perfil',
    component: PerfilComponent,
  },

  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full',
  },
];
