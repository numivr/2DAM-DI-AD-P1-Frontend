export class RegistroDTO {
  usuario: string;
  password: string;
  email: string;
  foto: string;
  genero: string;
  edad: string;
  raza: string;
  nivelEnergia: number;
  sociabilidad: number;
  tamaño: number;
  toleranciaEspecies: number;
  nivelDominancia: number;
  tendenciaJuego: number;
  temperamento: number;
  experiencia: number;
  territorialidad: number;

  constructor(
    usuario: string,
    password: string,
    email: string,
    foto: string,
    genero: string,
    edad: string,
    raza: string,
    nivelEnergia: number,
    sociabilidad: number,
    tamaño: number,
    toleranciaEspecies: number,
    nivelDominancia: number,
    tendenciaJuego: number,
    temperamento: number,
    experiencia: number,
    territorialidad: number
  ) {
    this.usuario = usuario;
    this.password = password;
    this.email = email;
    this.foto = foto;
    this.genero = genero;
    this.edad = edad;
    this.raza = raza;
    this.nivelEnergia = nivelEnergia;
    this.sociabilidad = sociabilidad;
    this.tamaño = tamaño;
    this.toleranciaEspecies = toleranciaEspecies;
    this.nivelDominancia = nivelDominancia;
    this.tendenciaJuego = tendenciaJuego;
    this.temperamento = temperamento;
    this.experiencia = experiencia;
    this.territorialidad = territorialidad;
  }
}
