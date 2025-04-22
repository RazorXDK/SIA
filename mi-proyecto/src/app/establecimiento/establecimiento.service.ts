import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Establecimiento {
  ID_ESTABLECIMIENTO: number;  // Necesario para actualizar y eliminar
  ID_PAIS: number | null;
  ID_TIPO_ESTABLECIMIENTO: number | null;
  NOMBRE: string;
  DIRECCION: string;
  TELEFONO: string;
  CORREO_ELECTRONICO: string;
  FECHA_CREACION: string;
  ESTADO: string;
}

@Injectable({
  providedIn: 'root'
})
export class EstablecimientoService {
  private apiUrl = 'http://localhost:3000/api/establecimientos';  // Ruta del backend

  constructor(private http: HttpClient) {}

  // Obtener todos los establecimientos
  obtenerEstablecimientos(): Observable<Establecimiento[]> {
    return this.http.get<Establecimiento[]>(this.apiUrl).pipe(
      catchError(this.manejarError)
    );
  }

  // Crear nuevo establecimiento (sin ID_ESTABLECIMIENTO)
  crearEstablecimiento(establecimiento: Omit<Establecimiento, 'ID_ESTABLECIMIENTO'>): Observable<Establecimiento> {
    return this.http.post<Establecimiento>(this.apiUrl, establecimiento).pipe(
      catchError(this.manejarError)
    );
  }

  // Actualizar establecimiento
  actualizarEstablecimiento(establecimiento: Establecimiento): Observable<Establecimiento> {
    if (establecimiento.ID_ESTABLECIMIENTO === 0) {
      return throwError(() => new Error('El ID del establecimiento es necesario para la actualización'));
    }
    return this.http.put<Establecimiento>(
      `${this.apiUrl}/${establecimiento.ID_ESTABLECIMIENTO}`,
      establecimiento
    ).pipe(
      catchError(this.manejarError)
    );
  }

  // Eliminar establecimiento por ID
  eliminarEstablecimiento(id: number): Observable<void> {
    if (id === 0) {
      return throwError(() => new Error('El ID del establecimiento es necesario para eliminar'));
    }
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.manejarError)
    );
  }

  // Manejo de errores HTTP
  private manejarError(error: any): Observable<never> {
    console.error('Ocurrió un error:', error);
    if (error.error) {
      console.error('Detalles del error:', error.error);
    }
    return throwError(() => new Error(error?.error?.message || 'Error en la solicitud HTTP'));
  }
}
