import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap,throwError , catchError} from 'rxjs';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient, private router: Router) {}

  // AuthService - Función de login
login(usuario: string, contrasena: string): Observable<any> {
    return this.http.post(this.apiUrl, { USUARIO: usuario, CONTRASENA: contrasena })
      .pipe(
        tap((res: any) => {
          if (res.token) {
            // Guardar el token en localStorage
            localStorage.setItem('token', res.token);
          }
          
          // Guardar los datos del usuario (si están disponibles)
          if (res.usuario) {
            localStorage.setItem('usuario', JSON.stringify(res.usuario));
          }
        }),
        catchError((err) => {
          // Manejo de errores si es necesario
          console.error('Error al iniciar sesión:', err);
          return throwError(() => new Error('Error al iniciar sesión'));
        })
      );
  }
  
  

  logout(): void {
    localStorage.removeItem('token');  // Elimina el token de localStorage
    this.router.navigate(['/auth']);    // Redirige a la página de login
  }
  

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
  
    try {
      const decoded: any = jwtDecode(token);
      const now = Date.now().valueOf() / 1000;
      return decoded.exp > now; // ✅ token válido y no expirado
    } catch (e) {
      return false;
    }
  }
  

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
