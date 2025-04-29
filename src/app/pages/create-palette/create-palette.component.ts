import { Component, input } from '@angular/core';
import { Palette } from '../../modules/interfaces';
import { OnePaletteComponent } from '../../components/one-palette/one-palette.component';
import { PALETTE_SIZE } from '../../modules/enums';

@Component({
  selector: 'app-create-palette',
  imports: [OnePaletteComponent],
  templateUrl: './create-palette.component.html',
  styleUrl: './create-palette.component.css'
})
export class CreatePaletteComponent {
  newPalette: Palette = { colors: [[241, 241, 241], [201, 201, 201], [164, 164, 164], [124, 124, 124]] };
  newSize = PALETTE_SIZE.LARGE
}
