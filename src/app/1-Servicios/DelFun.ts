import {ActivatedRoute} from "@angular/router";
import {PublicacionService} from "./publicacion.service";
import {ComentarioService} from "./comentario.service";

export class DelFun
{
  constructor
  (
    private route: ActivatedRoute,
    private publicacionService: PublicacionService,
    private comentarioService: ComentarioService
  ) { }

  // --- Funciones --- //
  public static borraPublicacion(datos: any[])
  {
    console.log("Publicación borrada: " + datos[0]);
  }

  public static banearPublicacion(datos: any[])
  {
    console.log("Publicación baneada con id: " + datos[0]);
  }

  public static banearPerfil(datos: any[])
  {
    console.log("Perfil baneado con nombre: " + datos[0]);
  }
}
