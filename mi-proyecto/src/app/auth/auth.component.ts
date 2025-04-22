import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.services';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroService } from '../auth/registro.services';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string | null = null;
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private registroService: RegistroService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      USUARIO: ['', Validators.required],
      CONTRASENA: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.logout();
  }

  onLogin(): void {
    if (this.loginForm.invalid) return;

    const { USUARIO, CONTRASENA } = this.loginForm.value;

    this.authService.login(USUARIO, CONTRASENA).subscribe({
      next: (res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.token = res.token;
        }

        if (res.usuario) {
          localStorage.setItem('usuario', JSON.stringify(res.usuario));
        }

        const direccionIp = '127.0.0.1';
        const clienteHttp = navigator.userAgent;

        const registro = {
          ID_USUARIO: res.usuario.ID_USUARIO,
          DIRECCION_IP: direccionIp,
          CLIENTE_HTTP: clienteHttp
        };

        this.registroService.crearRegistro(registro).subscribe({
          next: (registroRes) => {
            console.log('✅ Registro guardado exitosamente:', registroRes);
          },
          error: (err) => {
            console.error('❌ Error al guardar registro de inicio de sesión:', err);
          }
        });

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('❌ Error en login:', err);
        this.loginError = err?.error?.message || 'Error al iniciar sesión';
      }
    });
  }

  logout() {
    this.authService.logout();
    this.loginError = null;
    this.token = null;
    this.router.navigate(['/auth']);
  }
}
