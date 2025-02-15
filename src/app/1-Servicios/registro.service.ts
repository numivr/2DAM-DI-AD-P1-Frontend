import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RegistroDTO } from "../1-Modelos/RegistroDTO";

export interface Registro {
  [key: string]: any;
  idUsuario?: number;
  fotoUrl: string;
  genero: 'M' | 'F';
  edad: 'cachorro' | 'adulto' | 'senior';
  raza: string;
  nivelEnergia: number;
  sociabilidad: number;
  tamano: number;
  toleranciaEspecies: number;
  nivelDominancia: number;
  tendenciaJuego: number;
  temperamento: number;
  experiencia: number;
  territorialidad: number;
  nombreUsuario: string;
  email: string;
  contrasena: string;
  contrasenaRepetida: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  // Objeto que contendrá la información del registro
  registro: Registro = {
    fotoUrl: '',
    genero: 'M',
    edad: 'adulto',
    raza: '',
    nivelEnergia: 5,
    sociabilidad: 5,
    tamano: 5,
    toleranciaEspecies: 5,
    nivelDominancia: 5,
    tendenciaJuego: 5,
    temperamento: 5,
    experiencia: 5,
    territorialidad: 5,
    nombreUsuario: '',
    email: '',
    contrasena: '',
    contrasenaRepetida: ''
  };

  constructor(private httpClient: HttpClient) {}

  // Método para obtener el objeto registro
  getRegistro() {
    return this.registro;
  }

  // Método para actualizar un campo específico
  actualizarCampo(campo: string, valor: any) {
    if (campo in this.registro) {
      this.registro[campo] = valor;
      console.log(`Campo actualizado: ${campo} = ${valor}`);
    } else {
      console.warn(`Error: El campo "${campo}" no existe en registro.`);
    }
  }

  // ✅ Método para registrar y enviar los datos al backend
  registrar():Observable<any> {
    const registroDTO: RegistroDTO = {
      usuario: this.registro.nombreUsuario,
      password: this.registro.contrasena,
      email: this.registro.email,

      // 📌 Enviar las cualidades
      foto: this.registro.fotoUrl,
      genero: this.registro.genero,
      edad: this.registro.edad,
      raza: this.registro.raza,
      nivelEnergia: this.registro.nivelEnergia,
      sociabilidad: this.registro.sociabilidad,
      tamaño: this.registro.tamano,
      toleranciaEspecies: this.registro.toleranciaEspecies,
      nivelDominancia: this.registro.nivelDominancia,
      tendenciaJuego: this.registro.tendenciaJuego,
      temperamento: this.registro.temperamento,
      experiencia: this.registro.experiencia,
      territorialidad: this.registro.territorialidad
    };


    return this.httpClient.post<any>('api/auth/registro', registroDTO); // ✅ Retornamos el Observable
  }

  // Método para verificar si la credencial (nombre de usuario) está disponible en el backend
  GetverificarCredencialDisponible(nombreUsuario: string): Observable<any> {
    const params = new HttpParams().set('nombreUsuario', nombreUsuario);
    return this.httpClient.get<boolean>('api/auth/credencialDisponible', { params });
  }
}
