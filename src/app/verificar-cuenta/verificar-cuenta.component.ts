import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgClass, NgIf } from "@angular/common";
import { RegistroService } from "../1-Servicios/registro.service";

@Component({
  selector: 'app-verificar-cuenta',
  standalone: true,
  imports: [IonicModule, NgClass, NgIf],
  templateUrl: './verificar-cuenta.component.html',
  styleUrls: ['./verificar-cuenta.component.scss']
})
export class VerificarCuentaComponent implements OnInit {
  cargando: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private registroService: RegistroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.verificarCuenta();
  }

  verificarCuenta(): void {
    const usuario = this.route.snapshot.queryParamMap.get('usuario');
    if (usuario) {
      this.registroService.verificarCuenta(usuario).subscribe({
        next: () => this.finalizarCarga(),
        error: () => this.finalizarCarga(),
        complete: () => this.finalizarCarga()
      });
    } else {
      this.finalizarCarga();
    }
  }

  finalizarCarga(): void {
    this.cargando = false;
  }

  irALogin(): void {
    this.router.navigate(['/inicio']);
  }
}
