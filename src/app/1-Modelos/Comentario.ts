export class Comentario {
  id: number;
  idPublicacion: number;
  idUsuario: number;
  usuarioNombre: string;
  texto: string;
  fecha: string;

  constructor(
    id: number,
    idPublicacion: number,
    idUsuario: number,
    usuarioNombre: string,
    texto: string,
    fecha: string
  ) {
    this.id = id;
    this.idPublicacion = idPublicacion;
    this.idUsuario = idUsuario;
    this.usuarioNombre = usuarioNombre;
    this.texto = texto;
    this.fecha = fecha;
  }
}
