export class Publicacion {
  perfil: string;
  fotoPerfil: string;
  texto: string;
  fotoPublicacion: string;
  numComentarios: number;
  numLikes: number;
  liked: boolean;

  constructor(init?: Partial<Publicacion>) {
    this.perfil = init?.perfil || "Usuario desconocido";
    this.fotoPerfil = init?.fotoPerfil || "https://via.placeholder.com/80";
    this.texto = init?.texto || "";
    this.fotoPublicacion = init?.fotoPublicacion || "";
    this.numComentarios = Number(init?.numComentarios) || 0; // Convertir a número
    this.numLikes = init?.numLikes ?? 0;
    this.liked = init?.liked ?? false;
  }
}
