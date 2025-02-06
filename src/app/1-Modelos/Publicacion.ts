import {Comentario} from "./Comentario";

export class Publicacion{
  id?: number;
  texto?: string;
  fecha?: Date;
  usuarioId?: number;
  grupoId?: number;
  usuarioNombre?: string;
  grupoNombre?: string;
  usuarioFoto?: string;
  comentarios?: number;
  likes?: number;
  liked?: boolean;
  comentariosPublicacion?: Comentario[];
  constructor() {}
}
