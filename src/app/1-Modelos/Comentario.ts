export class Comentario {
  id: number;
  idPublicacion: number;
  idUsuario: number;
  usuarioCreador: string;
  fotoCreador: string; // ✅ Nuevo campo agregado
  texto: string;
  fecha: string;

  constructor(
    id: number,
    idPublicacion: number,
    idUsuario: number,
    usuarioNombre: string,
    fotoCreador: string, // ✅ Se incluye en el constructor
    texto: string,
    fecha: string
  ) {
    this.id = id;
    this.idPublicacion = idPublicacion;
    this.idUsuario = idUsuario;
    this.usuarioCreador = usuarioNombre;
    this.fotoCreador = fotoCreador; // ✅ Se asigna el valor recibido
    this.texto = texto;
    this.fecha = fecha;
  }
}
