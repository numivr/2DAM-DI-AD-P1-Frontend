import { Component } from '@angular/core';
import { RegistroService } from '../1-Servicios/registro.service';
import { AlertController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import {NgClass, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-resetear-contrasena',
  standalone: true,
  imports: [IonicModule, NgClass, NgIf, FormsModule, RouterLink],
  templateUrl: './resetear-contrasena.component.html',
  styleUrls: ['./resetear-contrasena.component.scss']
})
export class ResetearContrasenaComponent {
  nombreUsuario: string = '';

  constructor(private registroService: RegistroService, private alertController: AlertController) {}

  resetearContrasena() {
    if (!this.nombreUsuario) {
      this.mostrarAlerta('Error', 'Por favor, ingresa tu nombre de usuario.');
      return;
    }

    this.registroService.resetearContraseña(this.nombreUsuario).subscribe({
      next: async () => {
        await this.mostrarAlerta('Éxito', 'Se ha enviado una nueva contraseña a tu correo.');
      },
      error: async () => {
      }
    });
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
