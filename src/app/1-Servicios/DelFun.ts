import {HttpClient} from "@angular/common/http";
import { Router } from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import {PublicacionService} from "./publicacion.service";
import {ComentarioService} from "./comentario.service";
import {Injectable} from "@angular/core";
import { Subject } from 'rxjs';
import {UsuarioService} from "./usuario.service";

@Injectable
({
  providedIn: 'root'
})
export class DelFun
{
  constructor
  (
    private http: HttpClient,
    private publicacionService: PublicacionService,
    private comentarioService: ComentarioService,
    private usuarioService: UsuarioService,
    private router: Router
  )
  { }


  // --- Funciones --- //
  borraPublicacion(datos: any[])
  {
      this.publicacionService.eliminarPublicacion(datos[0]).subscribe
      ({
        next: (data) =>
        {
          this.recargar();
          console.log("Publicación borrada: " + datos[0])
        },
        error: (error) =>
        {
          this.recargar();
          console.error("Error al borrar la publicación: " + error)
        },
        complete: () => this.recargar()
      });
  }
  // Al final no se puede banear.
  banearPublicacion(datos: any[])
  {

  }


  borraComentario(datos: any[])
  {
    this.comentarioService.borrarComentario(datos[0]).subscribe
    ({
      next: (data) =>
      {
        this.recargar();
        console.log("Comentario borrado: " + datos[0])
      },
      error: (error) =>
      {
        this.recargar();
        console.error("Error al borrar el comentario: " + error)
      },
      complete: () => this.recargar()
    });
  }
  // Al final no se puede banear.
  banearComentario(datos: any[])
  {

  }


  banearPerfil(datos: any[])
  {
    console.log("Baneando perfil: " + datos[0]);
    this.usuarioService.bannearUsuario(datos[0]).subscribe
    ({
      next: (data) =>
      {
        //this.recargar();
        console.log("Perfil baneado: " + datos[0])
      },
      error: (error) =>
      {
        //this.recargar();
        console.error("Error al banear el perfil: " + error)
      },
      //complete: () => this.recargar()
    });
  }



  recargar()
  {
    location.reload();
    //this.router.navigate([this.router.url]).then(r => console.log("Recargado: " + r));
  }
}
