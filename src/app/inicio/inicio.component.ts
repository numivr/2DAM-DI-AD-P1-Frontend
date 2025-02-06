import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router, RouterLink} from "@angular/router";
import {UsuarioLogin} from "../1-Modelos/UsuarioLogin";
import {FormsModule} from "@angular/forms";
import {SesionService} from "../1-Servicios/sesion.service";
import {Token} from "../1-Modelos/Token";
import {AuthService} from "../1-Servicios/auth.service";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    RouterLink,
    FormsModule
  ]
})
export class InicioComponent  implements OnInit {

  constructor(
    private sesionService: SesionService,
    private authServicio: AuthService,
    private router: Router
  ) { }

  UsuarioLoggeado: UsuarioLogin = new UsuarioLogin();
  tokenUsuario: Token = new Token();


  ngOnInit() {}

  login() {
    console.info('Intentando iniciar sesión', this.UsuarioLoggeado);

    this.sesionService.PostLogin(this.UsuarioLoggeado).subscribe({
      next: (data) => {
        console.log('Login exitoso', data);
        this.tokenUsuario = data;

        // Guardar el token en el servicio de autenticación
        this.authServicio.setToken(data.token);

        // Redirigir al usuario al dashboard
        this.router.navigate(['/principal']);
      },
      error: (error) => {
        console.error('Error en el login', error);
        alert('Error al iniciar sesión. Verifique sus credenciales.');
      },
      complete: () =>{
        console.log('Petición de login completada')
        alert(this.tokenUsuario.message);
      }
    });



  }




}
