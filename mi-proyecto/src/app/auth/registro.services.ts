import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Registro {
  ID_USUARIO: number;
  DIRECCION_IP: string;
  CLIENTE_HTTP: string;
  ESTADO?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = 'http://localhost:3000/api/registro'; // Cambia esta URL según corresponda

  constructor(private http: HttpClient) { }

  // Método para crear un registro de inicio de sesión
  crearRegistro(registro: Registro): Observable<any> {
    return this.http.post<any>(this.apiUrl, registro);
  }
}
