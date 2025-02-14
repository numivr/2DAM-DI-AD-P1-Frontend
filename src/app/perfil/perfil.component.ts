import { Component, OnInit } from '@angular/core';
import { addIcons } from "ionicons";
import { add, chatbubblesOutline, personCircle } from "ionicons/icons";
import { IonicModule } from '@ionic/angular';
import { ComponentePublicacionComponent } from '../componentes/componente-publicacion/componente-publicacion.component';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Perfil } from "../1-Modelos/Perfil";
import { Publicacion } from "../1-Modelos/Publicacion";
import { PerfilService } from "../1-Servicios/perfil.service";
import { UsuarioService } from "../1-Servicios/usuario.service";


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ComponentePublicacionComponent,
    NgIf,
    NgOptimizedImage,
    RouterLink,
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
    private route: ActivatedRoute
  ) {}
  @ViewChild('crearPublicacionModal') modal!: IonModal;

  // ****** Declaraciones ****** //

  _perfilLogueado_Perfil!: Perfil;
  _perfilPorId_Perfil!: Perfil;
  _perfilFinal_Perfil!: Perfil;
  _siguiendoEstado_b: boolean = false;
  _idUsuario_i!: number;
  _publicaciones_list: Publicacion[] = [];

  _admin_b: boolean = false;



  nombre: string = '';
  _nombre_s: string = 'Cargando...';

  _tipo_s: string = 'Cargando...';
  _yoMismo_b: boolean = false;

  private m_seguidores_i: number = 10;
  private m_seguidos_i: number = 10;
  _seguidores_s: string = "";
  _seguidos_s: string = "";



  ngOnInit()
  {
    this.obtenerPerfilLoggeado();

    addIcons({
      'add': add,
      'chatbubbles-outline': chatbubblesOutline,
      'person-circle': personCircle,
      'image-outline': imageOutline
    });

  }

  continuarOnInit()
  {
    this._nombre_s = '@' + this._perfilFinal_Perfil.nombre;

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

  openFabModal() {
    this.isFabModalOpen = true;
  }

  closeFabModal() {
    this.isFabModalOpen = false;
  }

  submitPost() {
    if (this.newPostDescription.trim()) {
      console.log('Publicación creada:', this.newPostDescription);
      this.closeFabModal();
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  cancel() {
    this.closeFabModal();
  }

  obtenerPerfilLoggeado() {
    this.perfilService.obtenerPerfilLoggeado().subscribe({
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
        this._idUsuario_i = Number(this.route.snapshot.paramMap.get('id'));
        if (this._idUsuario_i == 1) // this._perfilLogueado_Perfil.id
        {
          this._yoMismo_b = true;
          this._perfilFinal_Perfil = this._perfilLogueado_Perfil;
          this._publicaciones_list = this._perfilLogueado_Perfil.publicaciones;
          this.continuarOnInit();
        }
        else
        {
          this.obtenerPerfilPorId(this._idUsuario_i);
        }
      }
    });
  }

  obtenerPerfilPorId(id: number)
  {
    this.perfilService.obtenerPerfilPorId(id).subscribe({
      next: (data) =>
      {
        console.log("✅ Perfil recibido:", data);
        this._perfilPorId_Perfil = data;
        this._publicaciones_list = data.publicaciones;
        this._siguiendoEstado_b = data.siguiendo; // Inicializar el estado de seguimiento
      },
      error: (error) =>
      {
        console.error(`❌ Error al obtener el perfil con ID ${id}:`, error);
      },
      complete: () =>
      {
        this._perfilFinal_Perfil = this._perfilPorId_Perfil;
        this.continuarOnInit();
      }
    });
  }


  toggleSeguir()
  {
    console.log("🟡 Click en seguir - ID usuario:", this._idUsuario_i);

    if (!this._idUsuario_i)
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
      this.usuarioService.seguir(this._idUsuario_i).subscribe({
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
      this.usuarioService.dejarSeguir(this._idUsuario_i).subscribe({
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
