import { Component, input } from '@angular/core';
import { Palette } from '../../modules/interfaces';
import { CommonModule } from '@angular/common';
import { PALETTE_SIZE } from '../../modules/enums';

@Component({
  selector: 'app-one-palette',
  imports: [CommonModule],
  templateUrl: './one-palette.component.html',
  styleUrl: './one-palette.component.css'
})
export class OnePaletteComponent {
  palette = input<Palette>()
  size = input<PALETTE_SIZE>(PALETTE_SIZE.MEDIUM)

  convertToHex(value: string | number[]) {
    if (typeof value === 'string')
      return value
    const color = value.reduce((cl, num)=>cl+=num.toString(16),'#')
    return color
  }

  getPXSize(){
    return this.size()+'px'
  }
}
