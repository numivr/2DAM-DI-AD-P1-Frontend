import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ComponentePublicacionComponent } from '../componentes/componente-publicacion/componente-publicacion.component';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Perfil } from "../1-Modelos/Perfil";
import { Publicacion } from "../1-Modelos/Publicacion";
import { PerfilService } from "../1-Servicios/perfil.service";
import { UsuarioService } from "../1-Servicios/usuario.service";

@Component({
  selector: 'app-perfil-ajeno',
  templateUrl: './perfil-ajeno.component.html',
  styleUrls: ['./perfil-ajeno.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ComponentePublicacionComponent,
    NgForOf
  ]
})
export class PerfilAjenoComponent implements OnInit {

  perfil!: Perfil;
  siguiendoEstado: boolean = false;
  idUsuario!: number;
  publicaciones: Publicacion[] = [];

  constructor(
    private perfilService: PerfilService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute
  ) {}

  toggleSeguir() {
    console.log("🟡 Click en seguir - ID usuario:", this.idUsuario);

    if (!this.idUsuario) {
      console.error("❌ Error: No se recibió un ID válido de usuario.");
      return;
    }

    // Alternar el estado local y actualizar el número de seguidores
    this.siguiendoEstado = !this.siguiendoEstado;
    this.perfil.numeroSeguidores = this.siguiendoEstado
      ? this.perfil.numeroSeguidores + 1
      : this.perfil.numeroSeguidores - 1;

    if (this.siguiendoEstado) {
      console.log("🔼 Siguiendo usuario...");
      this.usuarioService.seguir(this.idUsuario).subscribe({
        next: () => console.log("✅ Usuario seguido en el servidor"),
        error: (err: any) => {
          console.error("❌ Error al seguir usuario:", err);

        }
      });
    } else {
      console.log("🔽 Dejando de seguir usuario...");
      this.usuarioService.dejarSeguir(this.idUsuario).subscribe({
        next: () => console.log("✅ Usuario dejado de seguir en el servidor"),
        error: (err: any) => {
          console.error("❌ Error al dejar de seguir usuario:", err);

        }
      });
    }
  }


  ngOnInit() {
    this.idUsuario = Number(this.route.snapshot.paramMap.get('id'));
    if (this.idUsuario) {
      this.obtenerPerfilPorId(this.idUsuario);
    }
  }

  obtenerPerfilPorId(id: number) {
    this.perfilService.obtenerPerfilPorId(id).subscribe({
      next: (data) => {
        console.log("✅ Perfil recibido:", data);
        this.perfil = data;
        this.publicaciones = data.publicaciones;
        this.siguiendoEstado = data.siguiendo; // Inicializar el estado de seguimiento
      },
      error: (error) => {
        console.error(`❌ Error al obtener el perfil con ID ${id}:`, error);
      }
    });
  }

  /**
   * Método para alternar el estado de seguimiento del perfil.
   * Se actualiza el estado local, el contador de seguidores y se notifica al servidor.
   */


  protected readonly String = String;
  protected readonly Number = Number;
}
