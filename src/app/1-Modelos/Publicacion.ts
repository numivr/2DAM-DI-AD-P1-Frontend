import { Comentario } from "./Comentario";

export class Publicacion {
  id: number;
  idCreador: number; // ✅ Nuevo campo para almacenar el ID del creador
  perfil: string;
  fotoPerfil: string;
  texto: string;
  fotoPublicacion: string;
  numComentarios: string;
  numLikes: number;
  liked: boolean;
  comentarios: Comentario[];

  constructor(
    id: number = 0,
    idCreador: number = 0, // ✅ Se inicializa el ID del creador
    perfil: string = '',
    fotoPerfil: string = '',
    texto: string = '',
    fotoPublicacion: string = '',
    numComentarios: string = '',
    numLikes: number = 0,
    liked: boolean = false,
    comentarios: Comentario[] = []
  ) {
    this.id = id;
    this.idCreador = idCreador; // ✅ Se almacena el ID del creador
    this.perfil = perfil;
    this.fotoPerfil = fotoPerfil;
    this.texto = texto;
    this.fotoPublicacion = fotoPublicacion;
    this.numComentarios = numComentarios;
    this.numLikes = numLikes;
    this.liked = liked;

    this.comentarios = comentarios.map(c => new Comentario(
      c.id,
      c.idPublicacion,
      c.idUsuario,
      c.usuarioCreador,
      c.fotoCreador,
      c.texto,
      c.fecha
    ));
  }
}
