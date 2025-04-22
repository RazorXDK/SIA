import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pais {
  ID_PAIS: number;
  NOMBRE_PAIS: string;
  ESTADO: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private apiUrl = 'http://localhost:3000/api/paises';

  constructor(private http: HttpClient) {}

  obtenerPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(this.apiUrl);
  }
}
