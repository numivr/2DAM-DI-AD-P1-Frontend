import {Comentario} from "./Comentario";


export class Publicacion {
  id: number;
  perfil: string;
  fotoPerfil: string;
  texto: string;
  fotoPublicacion: string;
  numComentarios: string;
  numLikes: number;
  liked: boolean;
  comentarios: Comentario[]; // 👈 Se agrega el array de comentarios

  constructor(
    id: number = 0,
    perfil: string = '',
    fotoPerfil: string = '',
    texto: string = '',
    fotoPublicacion: string = '',
    numComentarios: string = '',
    numLikes: number = 0,
    liked: boolean = false,
    comentarios: Comentario[] = [] // 👈 Recibe los comentarios como array
  ) {
    this.id = id;
    this.perfil = perfil;
    this.fotoPerfil = fotoPerfil;
    this.texto = texto;
    this.fotoPublicacion = fotoPublicacion;
    this.numComentarios = numComentarios;
    this.numLikes = numLikes;
    this.liked = liked;

    // Convertir los datos recibidos en instancias de Comentario si es necesario
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
