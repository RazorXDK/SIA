import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService, Usuario } from './usuario.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioActual: Usuario = this.usuarioVacio();
  cargando = false;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.cargando = true;
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        this.cargando = false;
      }
    });
  }

  guardarUsuario(): void {
    const { ID_USUARIO } = this.usuarioActual;

    if (ID_USUARIO && ID_USUARIO !== 0) {
      this.actualizarUsuario();
    } else {
      this.crearUsuario();
    }
  }

  actualizarUsuario(): void {
    this.usuarioActual.ID_USUARIO = Number(this.usuarioActual.ID_USUARIO);

    this.usuarioService.actualizarUsuario(this.usuarioActual).subscribe({
      next: () => {
        this.cargarUsuarios();
        this.cancelarEdicion();
      },
      error: (err) => console.error('Error al actualizar usuario:', err)
    });
  }

  crearUsuario(): void {
    const { ID_USUARIO, ...usuarioSinID } = this.usuarioActual;

    this.usuarioService.crearUsuario(usuarioSinID).subscribe({
      next: () => {
        this.cargarUsuarios();
        this.cancelarEdicion();
      },
      error: (err) => console.error('Error al crear usuario:', err)
    });
  }

  editarUsuario(usuario: Usuario): void {
    this.usuarioActual = { ...usuario };
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(id).subscribe({
        next: () => this.cargarUsuarios(),
        error: (err) => console.error('Error al eliminar usuario:', err)
      });
    }
  }

  cancelarEdicion(): void {
    this.usuarioActual = this.usuarioVacio();
  }

  private usuarioVacio(): Usuario {
    return {
      ID_USUARIO: 0,
      NOMBRE: '',
      APELLIDO: '',
      CORREO_USUARIO: '',
      USUARIO: '',
      CONTRASENA: '',
      ESTADO: '',
      FECHA_REGISTRO: '',
      FECHA_NACIMIENTO: '',
      INTENTOS_FALLIDOS: 0
    };
  }
}
