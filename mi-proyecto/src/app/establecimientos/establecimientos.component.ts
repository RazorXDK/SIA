import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interfaces para tipado
interface Establecimientos {
  id?: number;
  nombre: string;
  direccion: string;
  telefono: string;
  correo: string;
  pais: string;
  tipo: string;
}

@Component({
  selector: 'app-establecimientos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './establecimientos.component.html',
  styleUrls: ['./establecimientos.component.scss']
})
export class EstablecimientosComponent implements OnInit {
  // Datos del establecimiento actual (para formulario)
  establecimiento: Establecimientos = {
    nombre: '',
    direccion: '',
    telefono: '',
    correo: '',
    pais: '',
    tipo: ''
  };

  // Lista de establecimientos
  establecimientos: Establecimientos[] = [];
  establecimientosFiltrados: Establecimientos[] = [];
  
  // Control de modo edición
  modoEdicion: boolean = false;
  establecimientoIdEditando: number | undefined;
  
  // Búsqueda de establecimientos
  private _busqueda: string = '';
  get busqueda(): string {
    return this._busqueda;
  }
  set busqueda(valor: string) {
    this._busqueda = valor;
    this.filtrarEstablecimientos();
  }
  
  // Listas para selects
  paises: string[] = [
    'México', 'Argentina', 'Colombia', 'Chile', 'Perú', 
    'España', 'Estados Unidos', 'Canadá', 'Brasil'
  ];
  
  tiposEstablecimiento: string[] = [
    'Escuela Primaria', 'Escuela Secundaria', 'Preparatoria', 
    'Universidad', 'Instituto Técnico', 'Centro de Capacitación',
    'Escuela de Idiomas', 'Academia'
  ];

  constructor() { }

  ngOnInit(): void {
    // Cargar lista de establecimientos (simulado)
    this.cargarEstablecimientos();
  }

  // Método para cargar establecimientos (simulado)
  cargarEstablecimientos(): void {
    // Aquí se conectaría con un servicio para obtener los datos reales
    this.establecimientos = [
      { 
        id: 1, 
        nombre: 'Colegio San Patricio', 
        direccion: 'Av. Insurgentes Sur 1234, CDMX', 
        telefono: '55 1234 5678', 
        correo: 'info@sanpatricio.edu.mx', 
        pais: 'México', 
        tipo: 'Escuela Primaria' 
      },
      { 
        id: 2, 
        nombre: 'Instituto Tecnológico Superior', 
        direccion: 'Calle Reforma 567, Guadalajara', 
        telefono: '33 9876 5432', 
        correo: 'contacto@its.edu.mx', 
        pais: 'México', 
        tipo: 'Universidad' 
      },
      { 
        id: 3, 
        nombre: 'Academia de Idiomas Global', 
        direccion: 'Paseo de la Reforma 789, CDMX', 
        telefono: '55 8765 4321', 
        correo: 'info@global-idiomas.com', 
        pais: 'México', 
        tipo: 'Escuela de Idiomas' 
      },
      { 
        id: 4, 
        nombre: 'Preparatoria Modelo', 
        direccion: 'Av. Universidad 456, Monterrey', 
        telefono: '81 2345 6789', 
        correo: 'contacto@prepamodelo.edu.mx', 
        pais: 'México', 
        tipo: 'Preparatoria' 
      }
    ];
    this.establecimientosFiltrados = [...this.establecimientos];
  }

  // Método para filtrar establecimientos
  filtrarEstablecimientos(): void {
    if (!this.busqueda.trim()) {
      this.establecimientosFiltrados = [...this.establecimientos];
      return;
    }
    
    const busquedaLower = this.busqueda.toLowerCase();
    this.establecimientosFiltrados = this.establecimientos.filter(est => {
      return (
        est.nombre.toLowerCase().includes(busquedaLower) ||
        est.direccion.toLowerCase().includes(busquedaLower) ||
        est.correo.toLowerCase().includes(busquedaLower) ||
        est.pais.toLowerCase().includes(busquedaLower) ||
        est.tipo.toLowerCase().includes(busquedaLower)
      );
    });
  }

  // Método para guardar establecimiento (crear o actualizar)
  guardarEstablecimiento(): void {
    // Validar campos obligatorios
    if (!this.establecimiento.nombre || !this.establecimiento.direccion || 
        !this.establecimiento.telefono || !this.establecimiento.correo ||
        !this.establecimiento.pais || !this.establecimiento.tipo) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }
    
    if (this.modoEdicion && this.establecimientoIdEditando) {
      // Actualizar establecimiento existente
      const index = this.establecimientos.findIndex(e => e.id === this.establecimientoIdEditando);
      if (index !== -1) {
        this.establecimientos[index] = {
          ...this.establecimiento,
          id: this.establecimientoIdEditando
        };
        console.log('Establecimiento actualizado:', this.establecimientos[index]);
        alert('Establecimiento actualizado correctamente');
      }
    } else {
      // Crear nuevo establecimiento
      const nuevoId = Math.max(0, ...this.establecimientos.map(e => e.id || 0)) + 1;
      const nuevoEstablecimiento: Establecimientos = {
        ...this.establecimiento,
        id: nuevoId
      };
      this.establecimientos.push(nuevoEstablecimiento);
      console.log('Nuevo establecimiento creado:', nuevoEstablecimiento);
      alert('Establecimiento creado correctamente');
    }
    
    // Actualizar lista filtrada
    this.filtrarEstablecimientos();
    
    // Limpiar formulario
    this.limpiarFormulario();
  }

  // Método para editar establecimiento
  editarEstablecimiento(est: Establecimientos): void {
    this.modoEdicion = true;
    this.establecimientoIdEditando = est.id;
    this.establecimiento = { ...est };
    
    // Desplazar hacia el formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Método para eliminar establecimiento
  eliminarEstablecimiento(id: number | undefined): void {
    if (!id) return;
    
    if (confirm('¿Está seguro que desea eliminar este establecimiento?')) {
      this.establecimientos = this.establecimientos.filter(e => e.id !== id);
      this.filtrarEstablecimientos();
      console.log('Establecimiento eliminado, ID:', id);
      
      // Si estamos editando el establecimiento que se eliminó, limpiar el formulario
      if (this.establecimientoIdEditando === id) {
        this.limpiarFormulario();
      }
    }
  }

  // Método para cancelar edición
  cancelarEdicion(): void {
    this.limpiarFormulario();
  }

  // Método para limpiar formulario
  limpiarFormulario(): void {
    this.establecimiento = {
      nombre: '',
      direccion: '',
      telefono: '',
      correo: '',
      pais: '',
      tipo: ''
    };
    this.modoEdicion = false;
    this.establecimientoIdEditando = undefined;
  }
}