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
import {authGuard} from "./1-Interceptor/Auth.guard";

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
    path: 'chatmensajes',
    component: ChatMensajesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'chatspersonas',
    component: ChatsPersonasComponent,
    canActivate: [authGuard]
  },
  {
    path: 'registrocualidades',
    component: RegistroCualidadesComponent,
  },
  {
    path: 'registroperro',
    component: RegistroPerroComponent,
  },
  {
    path: 'registrocuenta',
    component: RegistroCuentaComponent,
  },
  {
    path: 'publicacion',
    component: PublicacionComponent,
    canActivate: [authGuard]
  },
  {
    path: 'principal',
    component: PrincipalComponent,
    canActivate: [authGuard]
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
];
