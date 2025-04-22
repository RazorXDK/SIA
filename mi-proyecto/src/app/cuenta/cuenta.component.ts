import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interfaces para tipado
interface Usuario {
  id?: number;
  nombre: string;
  apellido: string;
  correo: string;
  usuario: string;
  fechaNacimiento: string;
}

interface Contrasenas {
  actual: string;
  nueva: string;
  confirmar: string;
}

interface Sesion {
  fecha: string;
  hora: string;
  dispositivo: string;
  ubicacion: string;
}

@Component({
  selector: 'app-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit {
  // Datos del usuario actual
  usuario: Usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    usuario: '',
    fechaNacimiento: ''
  };

  // Datos para cambio de contraseña
  contrasenas: Contrasenas = {
    actual: '',
    nueva: '',
    confirmar: ''
  };

  // Historial de sesiones
  sesiones: Sesion[] = [];

  // Lista de usuarios (para administradores)
  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = []; // Nueva propiedad para usuarios filtrados
  
  // Búsqueda de usuarios
  private _busqueda: string = '';
  get busqueda(): string {
    return this._busqueda;
  }
  set busqueda(valor: string) {
    this._busqueda = valor;
    this.filtrarUsuarios(); // Filtra usuarios cuando cambia la búsqueda
  }
  
  // Flag para determinar si el usuario es administrador
  esAdmin: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // Cargar datos del usuario actual (simulado)
    this.cargarDatosUsuario();
    
    // Cargar historial de sesiones (simulado)
    this.cargarHistorialSesiones();
    
    // Verificar si es administrador (simulado)
    this.verificarAdmin();
    
    // Si es administrador, cargar lista de usuarios (simulado)
    if (this.esAdmin) {
      this.cargarUsuarios();
    }
  }

  // Método para cargar datos del usuario actual (simulado)
  cargarDatosUsuario(): void {
    // Aquí se conectaría con un servicio para obtener los datos reales
    this.usuario = {
      nombre: 'Mario R.',
      apellido: 'Grajeda',
      correo: 'mario.grajeda@SIA.com',
      usuario: 'Admin-01',
      fechaNacimiento: '1999-08-09'
    };
  }

  // Método para cargar historial de sesiones (simulado)
  cargarHistorialSesiones(): void {
    // Aquí se conectaría con un servicio para obtener los datos reales
    this.sesiones = [
      { fecha: '2023-04-10', hora: '08:30', dispositivo: 'Chrome / Windows', ubicacion: 'Ciudad de México' },
      { fecha: '2023-04-08', hora: '14:15', dispositivo: 'Safari / iOS', ubicacion: 'Ciudad de México' },
      { fecha: '2023-04-05', hora: '19:45', dispositivo: 'Firefox / macOS', ubicacion: 'Guadalajara' }
    ];
  }

  // Método para verificar si el usuario es administrador (simulado)
  verificarAdmin(): void {
    // Aquí se conectaría con un servicio para verificar el rol del usuario
    this.esAdmin = true; // Para propósitos de demostración
  }

  // Método para cargar lista de usuarios (simulado)
  cargarUsuarios(): void {
    // Aquí se conectaría con un servicio para obtener los datos reales
    this.usuarios = [
      { id: 1, nombre: 'Juan', apellido: 'Pérez', correo: 'juan.perez@ejemplo.com', usuario: 'juanperez', fechaNacimiento: '1990-05-15' },
      { id: 2, nombre: 'María', apellido: 'González', correo: 'maria.gonzalez@ejemplo.com', usuario: 'mariagonzalez', fechaNacimiento: '1985-10-22' },
      { id: 3, nombre: 'Carlos', apellido: 'Rodríguez', correo: 'carlos.rodriguez@ejemplo.com', usuario: 'carlosrodriguez', fechaNacimiento: '1992-03-08' },
      { id: 4, nombre: 'Ana', apellido: 'López', correo: 'ana.lopez@ejemplo.com', usuario: 'analopez', fechaNacimiento: '1988-12-17' }
    ];
    this.usuariosFiltrados = [...this.usuarios]; // Inicializa los usuarios filtrados
  }

  // Método para filtrar usuarios
  filtrarUsuarios(): void {
    if (!this.busqueda.trim()) {
      this.usuariosFiltrados = [...this.usuarios];
      return;
    }
    
    const busquedaLower = this.busqueda.toLowerCase();
    this.usuariosFiltrados = this.usuarios.filter(user => {
      return (
        user.nombre.toLowerCase().includes(busquedaLower) ||
        user.apellido.toLowerCase().includes(busquedaLower) ||
        user.correo.toLowerCase().includes(busquedaLower) ||
        user.usuario.toLowerCase().includes(busquedaLower)
      );
    });
  }

  // Método para guardar cambios en el perfil
  guardarCambios(): void {
    console.log('Guardando cambios del perfil:', this.usuario);
    // Aquí se conectaría con un servicio para guardar los cambios
    alert('Cambios guardados correctamente');
  }

  // Método para cambiar contraseña
  cambiarContrasena(): void {
    // Validar que la nueva contraseña y la confirmación coincidan
    if (this.contrasenas.nueva !== this.contrasenas.confirmar) {
      alert('La nueva contraseña y la confirmación no coinciden');
      return;
    }
    
    console.log('Cambiando contraseña');
    // Aquí se conectaría con un servicio para cambiar la contraseña
    
    // Limpiar campos después de cambiar la contraseña
    this.contrasenas = { actual: '', nueva: '', confirmar: '' };
    
    alert('Contraseña cambiada correctamente');
  }

  // Métodos para gestión de usuarios (para administradores)
  agregarUsuario(): void {
    console.log('Agregar nuevo usuario');
    // Aquí se abriría un modal o se navegaría a una página para agregar usuario
  }

  editarUsuario(usuario: Usuario): void {
    console.log('Editar usuario:', usuario);
    // Aquí se abriría un modal o se navegaría a una página para editar usuario
  }

  eliminarUsuario(id: number | undefined): void {
    if (!id) return;
    
    if (confirm('¿Está seguro que desea eliminar este usuario?')) {
      console.log('Eliminar usuario con ID:', id);
      // Aquí se conectaría con un servicio para eliminar el usuario
      this.usuarios = this.usuarios.filter(u => u.id !== id);
      this.filtrarUsuarios(); // Actualiza la lista filtrada
    }
  }
}