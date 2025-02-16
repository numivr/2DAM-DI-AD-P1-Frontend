import {HttpClient} from "@angular/common/http";
import { Router } from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import {PublicacionService} from "./publicacion.service";
import {ComentarioService} from "./comentario.service";
import {Injectable} from "@angular/core";
import { Subject } from 'rxjs';

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

  borraComentario(datos: any[])
  {
    console.log("Comentario borrado: " + datos[0]);
  }

  banearPublicacion(datos: any[])
  {
    console.log("Publicación baneada con id: " + datos[0]);
  }

  banearComentario(datos: any[])
  {

  }

  banearPerfil(datos: any[])
  {
    console.log("Perfil baneado con nombre: " + datos[0]);
  }


  recargar()
  {
    location.reload();
    //this.router.navigate([this.router.url]).then(r => console.log("Recargado: " + r));
  }
}
