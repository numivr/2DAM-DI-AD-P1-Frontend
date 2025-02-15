import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistroService } from "../1-Servicios/registro.service";
import {AlertController, IonicModule} from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-registro-cualidades',
  templateUrl: './registro-cualidades.component.html',
  styleUrls: ['./registro-cualidades.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
  ],
})
export class RegistroCualidadesComponent implements OnInit {

  constructor(private http: HttpClient,
              public registroService: RegistroService,
              private router: Router,
              private alertController: AlertController) {}

  ngOnInit() {}

  enviarCorreo() {
    const datos = {
      email: this.registroService.registro.email,
      nombre: this.registroService.registro.nombreUsuario,
    };

    this.http.post('https://tu-backend.com/api/enviar-correo', datos)
      .subscribe({
        next: () => console.log('Correo enviado correctamente'),
        error: (error) => console.error('Error al enviar correo:', error),
      });
  }

  /**
   * ✅ Envía el registro y redirige a inicio si es exitoso
   */
  async registrarUsuario() {
    this.registroService.registrar().subscribe({
      next: async (response) => {
        console.log('✅ Registro exitoso:', response);

        const alert = await this.alertController.create({
          header: 'Registro Exitoso',
          message: '¡Bienvenido a Santuario! 🎉',
          buttons: ['OK']
        });

        await alert.present();
        await alert.onDidDismiss(); // Espera a que el usuario cierre la alerta

        this.router.navigate(['/inicio']); // 🔄 Redirigir a inicio
      },
      error: async (err) => {
        console.error('❌ Error en el registro:', err);

        const alert = await this.alertController.create({
          header: 'Error en el Registro',
          message: 'Hubo un problema al registrar tu cuenta. Inténtalo de nuevo.',
          buttons: ['OK']
        });

        await alert.present();
      }
    });
  }

}
