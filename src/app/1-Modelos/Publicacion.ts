import { Comentario } from './Comentario';

export class Publicacion {
  perfil: string;
  fotoPerfil: string;
  texto: string;
  fotoPublicacion: string;
  numComentarios: number;
  numLikes: number;
  liked: boolean;
  comentarios: Comentario[]; // Agregamos los comentarios como array de objetos

  constructor(
    perfil: string = '',
    fotoPerfil: string = '',
    texto: string = '',
    fotoPublicacion: string = '',
    numComentarios: number = 0,
    numLikes: number = 0,
    liked: boolean = false,
    comentarios: Comentario[] = []
  ) {
    this.perfil = perfil;
    this.fotoPerfil = fotoPerfil;
    this.texto = texto;
    this.fotoPublicacion = fotoPublicacion;
    this.numComentarios = numComentarios;
    this.numLikes = numLikes;
    this.liked = liked;
    this.comentarios = comentarios;
  }
}
