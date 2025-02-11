import { Publicacion } from "./Publicacion";

export class Perfil {
  nombre: string;
  numeroSeguidores: number;
  numeroSeguidos: number;
  raza: string;
  fotoPerfil: string;
  publicaciones: Publicacion[];

  constructor(
    nombre: string = '',
    numeroSeguidores: number = 0,
    numeroSeguidos: number = 0,
    raza: string = 'Desconocida',
    fotoPerfil: string = '',
    publicaciones: Publicacion[] = []
  ) {
    this.nombre = nombre;
    this.numeroSeguidores = numeroSeguidores;
    this.numeroSeguidos = numeroSeguidos;
    this.raza = raza;
    this.fotoPerfil = fotoPerfil;
    this.publicaciones = publicaciones;
  }
}
