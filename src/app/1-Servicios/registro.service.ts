import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RegistroDTO} from "../1-Modelos/RegistroDTO";

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
    fotoUrl: '',  // URL de la foto de perfil del usuario
    genero: 'M',  // Género predeterminado Masculino
    edad: 'adulto',  // Edad predeterminada como "adulto"
    raza: '',  // No hay raza seleccionada por defecto
    nivelEnergia: 5,  // Valor predeterminado de 5 en una escala de 1 a 10
    sociabilidad: 5,
    tamano: 5,
    toleranciaEspecies: 5,
    nivelDominancia: 5,
    tendenciaJuego: 5,
    temperamento: 5,
    experiencia: 5,
    territorialidad: 5,
    nombreUsuario: '',  // Nombre de usuario inicial vacío
    email: '',  // Email inicial vacío
    contrasena: '',  // Contraseña inicial vacía
    contrasenaRepetida: ''  // Confirmación de contraseña vacía
  };



  // Metodo para obtener el objeto registro
  getRegistro() {
    return this.registro;
  }

  // Metodo para actualizar un campo específico
  actualizarCampo(campo: string, valor: any) {
    if (campo in this.registro) {
      this.registro[campo] = valor;
      console.log(`Campo actualizado: ${campo} = ${valor}`);
    } else {
      console.warn(`Error: El campo "${campo}" no existe en registro.`);
    }
  }

  // ✅ Metodo para registrar y mostrar los datos en un alert
  registrar() {
      const datosRegistro = `
  🔹 **Nombre de Usuario:** ${this.registro.nombreUsuario || 'N/A'}
  🖼️ **Foto:** ${this.registro.fotoUrl || 'No subida'}
  👤 **Género:** ${this.registro.genero === 'M' ? 'Masculino' : 'Femenino'}
  📆 **Edad:** ${this.registro.edad}
  🐶 **Raza:** ${this.registro.raza}

  ⚡ **Nivel de Energía:** ${this.registro.nivelEnergia}/10
  🤝 **Sociabilidad:** ${this.registro.sociabilidad}/10
  📏 **Tamaño:** ${this.registro.tamano}/10
  🦴 **Tolerancia a Especies:** ${this.registro.toleranciaEspecies}/10
  👑 **Nivel de Dominancia:** ${this.registro.nivelDominancia}/10
  🎾 **Tendencia de Juego:** ${this.registro.tendenciaJuego}/10
  🧠 **Temperamento:** ${this.registro.temperamento}/10
  🏆 **Experiencia:** ${this.registro.experiencia}/10
  🏠 **Territorialidad:** ${this.registro.territorialidad}/10
      `;

    // ✅ Usamos `alert` para mostrar los datos (sin formato Markdown)
    window.alert(`Datos de registro:\n${datosRegistro.replace(/\*\*/g, '')}`);

    //RegistroDTO
// ✅ Crear una instancia de RegistroDTO
    const registroDTO = new RegistroDTO(
      this.registro.nombreUsuario,
      this.registro.contrasena,
      this.registro.email
    );

    // ✅ Hacer la petición POST al backend
    this.httpClient.post<any>('api/auth/registro', registroDTO).subscribe(
      (response) => {
        alert(`✅ Registro exitoso: Bienvenido, ${response.nombreUsuario}`);
      },
      (error) => {
        alert("❌ Error en el registro. Inténtalo de nuevo.");
        console.error(error);
      }
    );


  }

  constructor(private httpClient: HttpClient) {}

  /*
   * ✅ Metodo para verificar si la credencial (nombre de usuario) está disponible en el backend.
   * Hace una petición `GET` al endpoint `/auth/credencialDisponible`.
   * @param nombreUsuario - El nombre de usuario a verificar.
   * @returns Observable<boolean> - `true` si está disponible, `false` si ya está en uso.
   */
  GetverificarCredencialDisponible(nombreUsuario: string): Observable<any> {
    const params = new HttpParams().set('nombreUsuario', nombreUsuario);
    return this.httpClient.get<boolean>('api/auth/credencialDisponible', { params });
  }

}
