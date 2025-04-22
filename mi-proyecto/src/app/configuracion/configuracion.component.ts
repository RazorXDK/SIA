import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {
  color: string = '#4285f4';
  temasPredeterminados: string[] = [
    '#4285f4', '#ea4335', '#fbbc04', '#34a853', '#ff6d01', '#46bdc6'
  ];

  fuentesDisponibles: string[] = [
    "'Roboto', sans-serif",
    "'Open Sans', sans-serif",
    "'Lato', sans-serif",
    "'Montserrat', sans-serif",
    "'Courier New', monospace"
  ];

  fuenteSeleccionada: string = "'Roboto', sans-serif";

  ngOnInit(): void {
    // Inicializa color y fuente desde localStorage o fallback a los valores predeterminados
    this.color = this.getStoredValue('primary-color', this.color);
    this.fuenteSeleccionada = this.getStoredValue('system-font', this.fuenteSeleccionada);

    // Aplica el color y la fuente seleccionada
    this.setColor(this.color);
    this.setFuente(this.fuenteSeleccionada);
  }

  cambiarColor(event: Event): void {
    const nuevoColor = (event.target as HTMLInputElement).value;
    this.color = nuevoColor;
    this.setColor(nuevoColor);
  }

  seleccionarTema(tema: string): void {
    this.color = tema;
    this.setColor(tema);
  }

  cambiarFuente(event: Event): void {
    const nuevaFuente = (event.target as HTMLSelectElement).value;
    this.fuenteSeleccionada = nuevaFuente;
    this.setFuente(nuevaFuente);
  }

  private setColor(color: string): void {
    document.documentElement.style.setProperty('--primary-color', color);
    localStorage.setItem('primary-color', color);
  }

  private setFuente(fuente: string): void {
    document.documentElement.style.setProperty('--system-font', fuente);
    localStorage.setItem('system-font', fuente);
  }

  private getStoredValue(key: string, defaultValue: string): string {
    const storedValue = localStorage.getItem(key);
    return storedValue ? storedValue : defaultValue;
  }
}
