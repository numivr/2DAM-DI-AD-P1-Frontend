import { Component, OnInit, ViewChild } from '@angular/core';
import { addIcons } from "ionicons";
import { add, chatbubblesOutline, personCircle } from "ionicons/icons";
import { IonicModule, IonModal } from '@ionic/angular';
import { ComponentePublicacionComponent } from '../componentes/componente-publicacion/componente-publicacion.component';
import { ModalPublicacionComponent } from "../componentes/modal-publicacion/modal-publicacion.component";
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Perfil } from "../1-Modelos/Perfil";
import { Publicacion } from "../1-Modelos/Publicacion";
import { PerfilService } from "../1-Servicios/perfil.service";
import { UsuarioService } from "../1-Servicios/usuario.service";
import { UsuarioServiceNombre } from "../servicio/usuario-service-nombre.service";
import { FormsModule } from "@angular/forms";
import { DelFun } from "../1-Servicios/DelFun";


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ComponentePublicacionComponent,
    ModalPublicacionComponent,
    NgIf,
    NgForOf,
    FormsModule
  ]
})
export class PerfilComponent implements OnInit
{
  isFabModalOpen: boolean = false;
  newPostTitle: string = '';
  newPostDescription: string = '';

  constructor
  (
    private perfilService: PerfilService,
    private usuarioService: UsuarioService,
    private usuarioServiceNombre: UsuarioServiceNombre,
    private route: ActivatedRoute
  ) {}
  @ViewChild('crearPublicacionModal') modal!: IonModal;


  // ****** Declaraciones ****** //
  _perfilLogueado_Perfil!: Perfil;
  _perfilPorNombre_Perfil!: Perfil;
  _perfilFinal_Perfil!: Perfil;

  _siguiendoEstado_b: boolean = false;
  _nombreUsuario_s: string|null = null;
  _publicaciones_list: Publicacion[] = [];

  _admin_b: boolean = false;

  _imagePerfil_s: string = 'assets/persona_placeholder.jpg';
  _nombre_s: string = 'Cargando Nombre...';
  _tipo_s: string = 'Cargando Raza...';
  _yoMismo_b: boolean = false;

  private m_seguidores_i: number = -1;
  private m_seguidos_i: number = -1;
  _seguidores_s: string = "";
  _seguidos_s: string = "";



  ngOnInit()
  {
    this.obtenerPerfilLoggeado();

    addIcons
    ({
      'add': add,
      'chatbubbles-outline': chatbubblesOutline,
      'person-circle': personCircle,
      /* 'image-outline': imageOutline */
    });
  }

  continuarOnInit()
  {
    console.log("🟢 Perfil Logueado:", this._perfilLogueado_Perfil);
    if (this._perfilLogueado_Perfil.esAdmin)
      this._admin_b = true;

    this._imagePerfil_s = this._perfilFinal_Perfil.fotoPerfil || this._imagePerfil_s;

    this._nombre_s = '@' + this._perfilFinal_Perfil.nombre;

    this.m_seguidores_i = this._perfilFinal_Perfil.numeroSeguidores;
    this.m_seguidos_i = this._perfilFinal_Perfil.numeroSeguidos;
    this._tipo_s = this._perfilFinal_Perfil.raza;

    if (this.m_seguidores_i > 999999)
      this._seguidores_s = (this.m_seguidores_i / 1000000).toFixed(1) + 'M';

    else if (this.m_seguidores_i > 999)
      this._seguidores_s = (this.m_seguidores_i / 1000).toFixed(1) + 'K';

    else
      this._seguidores_s = this.m_seguidores_i.toString();


    if (this.m_seguidos_i > 999999)
      this._seguidos_s = (this.m_seguidos_i / 1000000).toFixed(1) + 'M';

    else if (this.m_seguidos_i > 999)
      this._seguidos_s = (this.m_seguidos_i / 1000).toFixed(1) + 'K';

    else
      this._seguidos_s = this.m_seguidos_i.toString();
  }

  openFabModal()
  {
    this.isFabModalOpen = true;
  }


  obtenerPerfilLoggeado()
  {
    this.perfilService.obtenerPerfilLoggeado().subscribe
    ({
      next: (data) => this._perfilLogueado_Perfil = data,
      error: (error) => console.error('❌ Error al obtener el perfil:', error),
      complete: () =>
      {
        this._nombreUsuario_s = this.route.snapshot.paramMap.get('nombre');
        if (this._nombreUsuario_s == this._perfilLogueado_Perfil.nombre) // this._perfilLogueado_Perfil.id
        {
          this._yoMismo_b = true;
          this._perfilFinal_Perfil = this._perfilLogueado_Perfil;
          this._publicaciones_list = this._perfilLogueado_Perfil.publicaciones;
          this.continuarOnInit();
        }
        else
          this.obtenerPerfilPorNombre(this._nombreUsuario_s || '');

      }
    });
  }

  obtenerPerfilPorNombre(_nombre_s: string)
  {
    this.perfilService.obtenerPerfilPorNombre(_nombre_s).subscribe
    ({
      next: (data) =>
      {
        console.log("✅ Perfil recibido:", data);
        this._perfilPorNombre_Perfil = data;
        this._publicaciones_list = data.publicaciones;
        this._siguiendoEstado_b = data.siguiendo; // Inicializar el estado de seguimiento
      },
      error: (error) =>
      {
        console.error(`❌ Error al obtener el perfil con Nombre ${_nombre_s}:`, error);
      },
      complete: () =>
      {
        this._perfilFinal_Perfil = this._perfilPorNombre_Perfil;
        this.continuarOnInit();
      }
    });
  }

  // TODO: Implementar la función de seguir y dejar de seguir
  toggleSeguir()
  {
    console.log("🟡 Click en seguir - ID usuario:", this._nombreUsuario_s);

    if (!this._nombreUsuario_s)
    {
      console.error("❌ Error: No se recibió un ID válido de usuario.");
      return;
    }

    // Alternar el estado local y actualizar el número de seguidores
    this._siguiendoEstado_b = !this._siguiendoEstado_b;
    this._perfilFinal_Perfil.numeroSeguidores = this._siguiendoEstado_b
      ? this._perfilFinal_Perfil.numeroSeguidores + 1
      : this._perfilFinal_Perfil.numeroSeguidores - 1;


    if (this._siguiendoEstado_b)
    {

      console.log("🔼 Siguiendo usuario..."); // Ariba ariba y ariba
      this.usuarioService.seguir(this._perfilFinal_Perfil.nombre).subscribe
      ({
        next: () =>           console.log("✅ Usuario seguido en el servidor"),
        error: (err: any) =>  console.error("❌ (fronted) Error al seguir usuario:", err),
      });

    }
    else
    {

      console.log("🔽 Dejando de seguir usuario..."); // abajo como mi autoestima
      this.usuarioService.dejarSeguir(this._perfilFinal_Perfil.nombre).subscribe
      ({
        next: () =>           console.log("✅ Usuario dejado de seguir en el servidor"),
        error: (err: any) =>  console.error("❌ (fronted) Error al dejar de seguir usuario:", err),
      });

    }

    this.continuarOnInit();
  }


  protected readonly Number = Number;
  protected readonly DelFun = DelFun;
}
