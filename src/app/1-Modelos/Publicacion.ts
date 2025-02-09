export class Publicacion {
  id: number; // 👈 Se agrega el ID de la publicación
  perfil: string;
  fotoPerfil: string;
  texto: string;
  fotoPublicacion: string;
  numComentarios: number;
  numLikes: number;
  liked: boolean;

  constructor(
    id: number = 0,
    perfil: string = '',
    fotoPerfil: string = '',
    texto: string = '',
    fotoPublicacion: string = '',
    numComentarios: number = 0,
    numLikes: number = 0,
    liked: boolean = false
  ) {
    this.id = id;
    this.perfil = perfil;
    this.fotoPerfil = fotoPerfil;
    this.texto = texto;
    this.fotoPublicacion = fotoPublicacion;
    this.numComentarios = numComentarios;
    this.numLikes = numLikes;
    this.liked = liked;
  }
}
