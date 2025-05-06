import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [Router],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  btnText: string = 'כניסה'

  constructor(private _router:Router){}  
  
  btnClick(){
    this._router.navigate(['/login'])
  }
}
