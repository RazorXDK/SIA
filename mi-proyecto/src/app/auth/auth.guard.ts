import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // ✅ permite acceder si tiene token
    } else {
      this.router.navigate(['/auth']); // ❌ redirige al login si no está logueado
      return false;
    }
  }
  
}
