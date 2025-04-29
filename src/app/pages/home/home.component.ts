import { Component } from '@angular/core';
import { Palette } from '../../modules/interfaces';
import { OnePaletteComponent } from '../../components/one-palette/one-palette.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [OnePaletteComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  list: Palette[] = new Array<Palette>()

  constructor() {
    this.list.push(
      // {
    //   // id: '#123456#234567#345678#456789',
    //   colors: ['#123456', '#234567', '#345678', '#456789']
    // }, {
    //   // id: '#123456#234567#345678#456789',
    //   colors: ['#987654', '#876543', '#765432', '#654321']
    // },
    //   {
    //     // id: '#123456#234567#345678#456789',
    //     colors: ['#123321', '#357753', '#456654', '#789987']
    //   },
      {
        colors: [[247, 111, 111],
        [247, 127, 108],
        [247, 150, 108],
        [247, 170, 103]]}
        // ,{colors:[
        // [245, 208, 105],
        // [248, 217, 104],
        // [245, 234, 107],
        // [238, 245, 109]]}
        // ,{colors:[
        // [215, 248, 97],
        // [205, 248, 103],
        // [209, 248, 109],
        // [157, 250, 103]]}
        // ,{colors:[
        // [109, 247, 160],
        // [104, 245, 196],
        // [107, 247, 230],
        // [105, 238, 245]]}
        // ,{colors:[
        // [107, 215, 248],
        // [112, 188, 250],
        // [108, 152, 248],
        // [107, 126, 248]]}
        // ,{colors:[
        // [172, 107, 247],
        // [194, 107, 248],
        // [220, 109, 248],
        // [247, 109, 247]]}
        // ,{colors:[
        // [250, 113, 234],
        // [247, 110, 217],
        // [247, 114, 189],
        // [245, 107, 164],
        // [247, 106, 129]]}
      // }
    )
  }
}