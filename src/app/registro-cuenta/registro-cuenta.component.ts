import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import {Router, RouterLink} from "@angular/router";
import { addIcons } from "ionicons";
import { arrowForwardOutline } from "ionicons/icons";
import { RegistroService } from "../1-Servicios/registro.service";
import { FormsModule } from "@angular/forms";
import { NgClass, NgIf } from "@angular/common";

@Component({
  selector: 'app-registro-cuenta',
  templateUrl: './registro-cuenta.component.html',
  styleUrls: ['./registro-cuenta.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    NgIf,
    RouterLink
  ]
})
export class RegistroCuentaComponent implements OnInit {
  mensajeDisponibilidad = '';
  esDisponible: boolean = false;
  mostrarErrores = false;

  // Nuevas propiedades para validación de email y contraseñas
  emailValido: boolean = false;
  passwordsValid: boolean = false;

  constructor(
    public registroService: RegistroService,
    private router: Router
  ) {
  }

  ngOnInit() {
    addIcons({
      'arrow-forward-outline': arrowForwardOutline,
    });
  }

  /**
   * Valida el email utilizando una expresión regular.
   */
  validarEmail(): boolean {
    const email = this.registroService.registro.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Valida que las contraseñas coincidan y no sean vacías.
   */
  validarContrasenas(): boolean {
    const {contrasena, contrasenaRepetida} = this.registroService.registro;
    return contrasena === contrasenaRepetida && contrasena.length > 0;
  }

  /**
   * Verifica la disponibilidad del nombre de usuario en el backend.
   */
  verificarDisponibilidad(): void {
    const nombreUsuario = this.registroService.registro.nombreUsuario.trim();

    if (!nombreUsuario) {
      this.mensajeDisponibilidad = "⚠️ Ingresa un nombre de usuario.";
      this.esDisponible = false;
      return;
    }

    this.registroService.GetverificarCredencialDisponible(nombreUsuario).subscribe(
      (disponible) => {
        this.esDisponible = disponible;
        this.mensajeDisponibilidad = disponible
          ? '✅ Nombre de usuario disponible.'
          : '❌ Nombre de usuario en uso.';
      },
      (error) => {
        this.mensajeDisponibilidad = '⚠️ Error al verificar disponibilidad.';
        console.error(error);
        this.esDisponible = false;
      }
    );
  }

  /**
   * Se ejecuta cuando el campo de email pierde el foco.
   * Actualiza la propiedad `emailValido`.
   */
  onEmailBlur(): void {
    this.emailValido = this.validarEmail();
  }

  /**
   * Se ejecuta cuando alguno de los campos de contraseña pierde el foco.
   * Actualiza la propiedad `passwordsValid`.
   */
  onPasswordBlur(): void {
    this.passwordsValid = this.validarContrasenas();
  }

  /**
   * Valida todo el formulario antes de continuar.
   */
  validarFormulario(): boolean {
    return this.validarEmail() && this.validarContrasenas() && this.esDisponible;
  }

  /**
   * Se ejecuta al hacer clic en el botón "Continuar".
   * Si el formulario es válido, navega al siguiente paso.
   */
  continuarRegistro() {
    this.mostrarErrores = true;


    // Puedes volver a validar aquí en caso de que no se hayan ejecutado los onBlur
    this.emailValido = this.validarEmail();
    this.passwordsValid = this.validarContrasenas();

    if (this.validarFormulario()) {
      this.router.navigate(['/registroperro']);
    }
  }
}
