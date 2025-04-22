import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstablecimientoService, Establecimiento } from './establecimiento.service';
import { PaisService, Pais } from './pais.service';
import { TipoEstablecimientoService, TipoEstablecimiento } from './tiposEstablecimiento.service';

@Component({
  selector: 'app-establecimientos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './establecimiento.component.html',
  styleUrls: ['./establecimiento.component.scss']
})
export class EstablecimientoComponent implements OnInit {
  establecimientos: Establecimiento[] = [];
  establecimientoActual: Establecimiento = this.establecimientoVacio();
  paises: Pais[] = [];
  tiposEstablecimiento: TipoEstablecimiento[] = [];
  cargando = false;

  constructor(
    private establecimientoService: EstablecimientoService,
    private paisService: PaisService,
    private tipoEstablecimientoService: TipoEstablecimientoService
  ) {}

  ngOnInit(): void {
    this.cargarEstablecimientos();
    this.cargarPaises();
    this.cargarTiposEstablecimiento();
  }

  cargarEstablecimientos(): void {
    this.cargando = true;
    this.establecimientoService.obtenerEstablecimientos().subscribe({
      next: (data) => {
        this.establecimientos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar establecimientos:', err);
        this.cargando = false;
      }
    });
  }

  cargarPaises(): void {
    this.paisService.obtenerPaises().subscribe({
      next: (data) => this.paises = data,
      error: (err) => console.error('Error al cargar países:', err)
    });
  }

  cargarTiposEstablecimiento(): void {
    this.tipoEstablecimientoService.obtenerTipos().subscribe({
      next: (data) => this.tiposEstablecimiento = data,
      error: (err) => console.error('Error al cargar tipos de establecimiento:', err)
    });
  }

  guardarEstablecimiento(): void {
    const { ID_ESTABLECIMIENTO } = this.establecimientoActual;
    if (ID_ESTABLECIMIENTO && ID_ESTABLECIMIENTO !== 0) {
      this.actualizarEstablecimiento();
    } else {
      this.crearEstablecimiento();
    }
  }

  actualizarEstablecimiento(): void {
    this.establecimientoActual.ID_ESTABLECIMIENTO = Number(this.establecimientoActual.ID_ESTABLECIMIENTO);
    this.establecimientoService.actualizarEstablecimiento(this.establecimientoActual).subscribe({
      next: () => {
        this.cargarEstablecimientos();
        this.cancelarEdicion();
      },
      error: (err) => console.error('Error al actualizar establecimiento:', err)
    });
  }

  crearEstablecimiento(): void {
    const { ID_ESTABLECIMIENTO, ...establecimientoSinID } = this.establecimientoActual;
    this.establecimientoService.crearEstablecimiento(establecimientoSinID).subscribe({
      next: () => {
        this.cargarEstablecimientos();
        this.cancelarEdicion();
      },
      error: (err) => console.error('Error al crear establecimiento:', err)
    });
  }

  editarEstablecimiento(est: Establecimiento): void {
    this.establecimientoActual = { ...est };
  }

  eliminarEstablecimiento(id: number): void {
    if (confirm('¿Estás seguro de eliminar este establecimiento?')) {
      this.establecimientoService.eliminarEstablecimiento(id).subscribe({
        next: () => this.cargarEstablecimientos(),
        error: (err) => console.error('Error al eliminar establecimiento:', err)
      });
    }
  }

  cancelarEdicion(): void {
    this.establecimientoActual = this.establecimientoVacio();
  }

  obtenerNombrePais(id: number | null): string {
    const pais = this.paises.find(p => p.ID_PAIS === id);
    return pais ? pais.NOMBRE_PAIS : 'Desconocido';
  }

  obtenerNombreTipo(id: number | null): string {
    const tipo = this.tiposEstablecimiento.find(t => t.ID_TIPO_ESTABLECIMIENTO === id);
    return tipo ? tipo.DESCRIPCION : 'Desconocido';
  }

  private establecimientoVacio(): Establecimiento {
    return {
      ID_ESTABLECIMIENTO: 0,
      ID_PAIS: null,
      ID_TIPO_ESTABLECIMIENTO: null,
      NOMBRE: '',
      DIRECCION: '',
      TELEFONO: '',
      CORREO_ELECTRONICO: '',
      FECHA_CREACION: '',
      ESTADO: ''
    };
  }
}
