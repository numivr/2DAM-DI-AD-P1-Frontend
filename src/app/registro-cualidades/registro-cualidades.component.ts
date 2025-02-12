import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistroService } from "../1-Servicios/registro.service";
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

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

  constructor(private http: HttpClient, public registroService: RegistroService) {}

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

}
