import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import {RegistroService} from "../1-Servicios/registro.service";

@Component({
  selector: 'app-registro-cualidades',
  templateUrl: './registro-cualidades.component.html',
  styleUrls: ['./registro-cualidades.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class RegistroCualidadesComponent implements OnInit {
  selectedValue1: number = 5;
  selectedValue2: number = 5;
  selectedValue3: number = 5;
  selectedValue4: number = 5;
  selectedValue5: number = 5;
  selectedValue6: number = 5;
  selectedValue7: number = 5;
  selectedValue8: number = 5;
  selectedValue9: number = 5;

  // Botones del alert
  alertButtons = [
    {
      text: 'Aceptar',
      handler: () => {
        this.router.navigate(['/inicio']);
      },
    },
  ];

  constructor(private router: Router, public registroService: RegistroService) {}

  ngOnInit() {}

  onRangeChange(event: any) {
    console.log('New range value:', event.detail.value);
  }
}
