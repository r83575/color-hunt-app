import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Palette } from '../modules/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaletteService {

  private readonly baseUrl ='http://192.168.42.22:8080'
  private readonly http = inject(HttpClient)

  constructor() { }

  getAllPalette():Observable<Palette[]>{
      return this.http.get<Palette[]>(`${this.baseUrl}/palette/all`)
  }
}
