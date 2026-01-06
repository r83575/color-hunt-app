import { Component, inject } from '@angular/core';
import { Palette } from '../../modules/interfaces';
import { OnePaletteComponent } from '../../components/one-palette/one-palette.component';
import { CommonModule } from '@angular/common';
import { PaletteService } from '../../services/palette.service';

@Component({
  selector: 'app-home',
  imports: [OnePaletteComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private readonly paletteService= inject(PaletteService)
  list: Palette[] = new Array<Palette>()

  constructor() {
    this.paletteService.getAllPalette().subscribe(ans=>this.list=ans)
    
  }
}