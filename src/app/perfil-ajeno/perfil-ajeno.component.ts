import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ComponentePublicacionComponent } from '../componentes/componente-publicacion/componente-publicacion.component';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { addIcons } from "ionicons";
import { add, chatbubblesOutline, personCircle } from "ionicons/icons";
import { Perfil } from "../1-Modelos/Perfil";
import { Publicacion } from "../1-Modelos/Publicacion";
import { PerfilService } from "../1-Servicios/perfil.service";
import { UsuarioService } from "../1-Servicios/usuario.service"; // ✅ Importamos UsuarioService

@Component({
  selector: 'app-perfil-ajeno',
  templateUrl: './perfil-ajeno.component.html',
  styleUrls: ['./perfil-ajeno.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ComponentePublicacionComponent,
    NgIf,
    NgOptimizedImage,
    RouterLink,
    NgForOf
  ]
})
export class PerfilAjenoComponent implements OnInit {

  perfil!: Perfil;
  siguiendoEstado: boolean = false;  // ✅ Variable local para manejar el estado
  idUsuario!: number;
  publicaciones: Publicacion[] = [];

  constructor(
    private perfilService: PerfilService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // 📌 Obtener el ID de la URL
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
        this.siguiendoEstado = data.siguiendo; // ✅ Inicializar variable local
      },
      error: (error) => {
        console.error(`❌ Error al obtener el perfil con ID ${id}:`, error);
      }
    });
  }

  toggleSeguir() {
    if (this.siguiendoEstado) {
      this.usuarioService.dejarSeguir(this.idUsuario).subscribe({
        next: () => {
          console.log(`❌ Dejaste de seguir a ${this.perfil.nombre}`);
          this.siguiendoEstado = false;
          this.perfil.numeroSeguidores--; // 🔽 Reducimos seguidores
        },
        error: (error) => console.error("❌ Error al dejar de seguir:", error)
      });
    } else {
      this.usuarioService.seguir(this.idUsuario).subscribe({
        next: () => {
          console.log(`✅ Ahora sigues a ${this.perfil.nombre}`);
          this.siguiendoEstado = true;
          this.perfil.numeroSeguidores++; // 🔼 Aumentamos seguidores
        },
        error: (error) => console.error("❌ Error al seguir usuario:", error)
      });
    }
  }
}




