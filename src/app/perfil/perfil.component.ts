import { Component, OnInit, ViewChild } from '@angular/core';
import { addIcons } from "ionicons";
import { add, chatbubblesOutline, personCircle } from "ionicons/icons";
import { IonicModule, IonModal } from '@ionic/angular';
import { ComponentePublicacionComponent } from '../componentes/componente-publicacion/componente-publicacion.component';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Perfil } from "../1-Modelos/Perfil";
import { Publicacion } from "../1-Modelos/Publicacion";
import { PerfilService } from "../1-Servicios/perfil.service";
import { UsuarioService } from "../1-Servicios/usuario.service";
import { UsuarioServiceNombre } from "../servicio/usuario-service-nombre.service";
import { FormsModule } from "@angular/forms";


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ComponentePublicacionComponent,
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
  _perfilPorId_Perfil!: Perfil;
  _perfilFinal_Perfil!: Perfil;

  _siguiendoEstado_b: boolean = false;
  _nombreUsuario_s: string|null = null;
  _publicaciones_list: Publicacion[] = [];

  _admin_b: boolean = false;

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

  closeFabModal()
  {
    this.isFabModalOpen = false;
  }

  submitPost()
  {
    if (this.newPostDescription.trim())
    {
      console.log('Publicación creada:', this.newPostDescription);
      this.closeFabModal();
    }
    else
    {
      alert('Por favor, completa todos los campos.');
    }
  }

  cancel()
  {
    this.closeFabModal();
  }

  obtenerPerfilLoggeado()
  {
    this.perfilService.obtenerPerfilLoggeado().subscribe
    ({
      next: (data) =>
      {
        this._perfilLogueado_Perfil = new Perfil
        (
          data.nombre,
          data.numeroSeguidores,
          data.numeroSeguidos,
          data.raza,
          data.fotoPerfil,
          data.publicaciones
        );
      },
      error: (error) =>
      {
        console.error('❌ Error al obtener el perfil:', error);
      },
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
        {
          this.obtenerPerfilPorNombre(this._nombreUsuario_s || '');
        }
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
        this._perfilPorId_Perfil = data;
        this._publicaciones_list = data.publicaciones;
        this._siguiendoEstado_b = data.siguiendo; // Inicializar el estado de seguimiento
      },
      error: (error) =>
      {
        console.error(`❌ Error al obtener el perfil con Nombre ${_nombre_s}:`, error);
      },
      complete: () =>
      {
        this._perfilFinal_Perfil = this._perfilPorId_Perfil;
        this.continuarOnInit();
      }
    });
  }

  // NOTA: "seguir" y "dejarSeguir" está picado el 1.
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
    this._perfilPorId_Perfil.numeroSeguidores = this._siguiendoEstado_b
      ? this._perfilPorId_Perfil.numeroSeguidores + 1
      : this._perfilPorId_Perfil.numeroSeguidores - 1;

    if (this._siguiendoEstado_b)
    {
      console.log("🔼 Siguiendo usuario...");
      this.usuarioService.seguir(1).subscribe({
        next: () => console.log("✅ Usuario seguido en el servidor"),
        error: (err: any) =>
        {
          console.error("❌ Error al seguir usuario:", err);
        }
      });
    }
    else
    {
      console.log("🔽 Dejando de seguir usuario...");
      this.usuarioService.dejarSeguir(1).subscribe({
        next: () => console.log("✅ Usuario dejado de seguir en el servidor"),
        error: (err: any) =>
        {
          console.error("❌ Error al dejar de seguir usuario:", err);
        }
      });
    }
  }


  ejeBan(id:number)
  {
    console.log("Ejemplo de ban: " + id);
  }

  banearPublicacion(datos: any[])
  {
    console.log("Publicación baneada con id: " + datos[0]);
  }

  protected readonly Number = Number;
}
