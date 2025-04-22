import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Usuario {
  ID_USUARIO: number;  // ID_USUARIO es necesario solo para actualizar y eliminar
  NOMBRE: string;
  APELLIDO: string;
  CORREO_USUARIO: string;
  USUARIO: string;
  CONTRASENA: string;  // Correcto el nombre de la columna
  ESTADO: string;
  FECHA_REGISTRO: string;
  FECHA_NACIMIENTO: string;
  INTENTOS_FALLIDOS: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api/usuarios';  // La URL de la API del backend

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl).pipe(
      catchError(this.manejarError)
    );
  }

  // Crear un nuevo usuario, sin el campo 'ID_USUARIO'
  crearUsuario(usuario: Omit<Usuario, 'ID_USUARIO'>): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario).pipe(
      catchError(this.manejarError)
    );
  }

  // Actualizar un usuario por su ID
  actualizarUsuario(usuario: Usuario): Observable<Usuario> {
    if (usuario.ID_USUARIO === 0) {
      return throwError(() => new Error('El ID del usuario es necesario para la actualización'));
    }
    return this.http.put<Usuario>(`${this.apiUrl}/${usuario.ID_USUARIO}`, usuario).pipe(
      catchError(this.manejarError)
    );
  }

  // Eliminar un usuario por su ID
  eliminarUsuario(id: number): Observable<void> {
    if (id === 0) {
      return throwError(() => new Error('El ID del usuario es necesario para eliminar'));
    }
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.manejarError)
    );
  }

  // Manejo de errores en las solicitudes HTTP
  private manejarError(error: any): Observable<never> {
    console.error('Ocurrió un error:', error);
    if (error.error) {
      console.error('Detalles del error:', error.error);  // Muestra los detalles del error desde la respuesta del servidor
    }
    return throwError(() => new Error(error?.error?.message || 'Error en la solicitud HTTP'));
  }
}
