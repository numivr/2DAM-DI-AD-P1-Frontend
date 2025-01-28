import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ima0',
  templateUrl: './ima0.component.html',
  styleUrls: ['./ima0.component.scss'],
  standalone: true
})
export class Ima0Component implements OnInit
{
  constructor() { }

  @Input() public enlace: string = '';
  @Input() public tamano: string = '';
  @Input() public css: string = '';
  protected p_tamano_s: string = 'chica';

  ngOnInit(): void
  {
    if (this.tamano == 'grande')
    {
      this.p_tamano_s = "grande";
    }
    else if (this.tamano == 'chica')
    {
      this.p_tamano_s = "chica";
    }
  }
}
