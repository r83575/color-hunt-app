import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Palette } from '../../modules/interfaces';
import { PALETTE_SIZE } from '../../modules/enums';
import { PaletteService } from '../../services/palette.service';

@Component({
  selector: 'app-create-palette',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-palette.component.html',
  styleUrl: './create-palette.component.css'
})

export class CreatePaletteComponent {
  newPalette: Palette = { colors: [[241, 241, 241], [201, 201, 201], [164, 164, 164], [124, 124, 124]] };
  newSize = PALETTE_SIZE.LARGE
  showInputs = false

  constructor(private paletteService: PaletteService) { }

  toggleInputs() {
    this.showInputs = true;
  }

  updateColor(event: Event, index: number) {
    const value = (event.target as HTMLInputElement).value;
    this.newPalette.colors[index] = value;
  }

  savePalette() {
    this.paletteService.createPalette(this.newPalette).subscribe();
  }

  colorToCss(color: string | number[]): string {
    if (Array.isArray(color)) {
      return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    }
    return color;
  }

  colorToHex(color: string | number[]): string {
    if (typeof color === 'string') {
      return color.startsWith('#') ? color : '#000000';
    }

    const [r, g, b] = color;
    return (
      '#' +
      [r, g, b]
        .map(v => v.toString(16).padStart(2, '0'))
        .join('')
    );
  }

  getPXSize() {
    return this.newSize + 'px'
  }
}
