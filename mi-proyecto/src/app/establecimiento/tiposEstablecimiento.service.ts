import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TipoEstablecimiento {
  ID_TIPO_ESTABLECIMIENTO: number;
  DESCRIPCION: string;
  ESTADO: string;
}

@Injectable({
  providedIn: 'root'
})
export class TipoEstablecimientoService {
  private apiUrl = 'http://localhost:3000/api/tipos-establecimiento';

  constructor(private http: HttpClient) {}

  // Este es el método que debes agregar:
  obtenerTipos(): Observable<TipoEstablecimiento[]> {
    return this.http.get<TipoEstablecimiento[]>(this.apiUrl);
  }
  
}
