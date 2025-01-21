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
  protected _tamano_s: string = '';

  ngOnInit(): void
  {
    if (this.tamano == 'grande')
    {
      this._tamano_s = "grande";
    }
    else if (this.tamano == 'chica')
    {
      this._tamano_s = "chica";
    }
  }
}
