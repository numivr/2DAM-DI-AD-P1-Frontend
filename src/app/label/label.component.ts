import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  standalone: true
})
export class LabelComponent
{
  // Delarciones //
  @Input() _texto: string = '';
  @Input() _css: string|null = '';

  constructor() { }

}
