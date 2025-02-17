import { Publicacion } from "./Publicacion";

export class Perfil {
  nombre: string;
  numeroSeguidores: number;
  numeroSeguidos: number;
  raza: string;
  fotoPerfil: string;
  publicaciones: Publicacion[];
  siguiendo: boolean; // ✅ Se agrega el atributo siguiendo
  esAdmin: boolean;
  baneado: boolean;

  constructor(
    nombre: string = '',
    numeroSeguidores: number = 0,
    numeroSeguidos: number = 0,
    raza: string = 'Desconocida',
    fotoPerfil: string = '',
    publicaciones: Publicacion[] = [],
    siguiendo: boolean = false, // ✅ Inicializamos el nuevo atributo
    esAdmin: boolean = false,
    baneado: boolean = false
  ) {
    this.nombre = nombre;
    this.numeroSeguidores = numeroSeguidores;
    this.numeroSeguidos = numeroSeguidos;
    this.raza = raza;
    this.fotoPerfil = fotoPerfil;
    this.publicaciones = publicaciones;
    this.siguiendo = siguiendo;
    this.esAdmin = esAdmin;
    this.baneado = baneado;
  }
}
