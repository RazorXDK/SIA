import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule si necesitas formularios

@Component({
  selector: 'app-perfil',
  standalone: true,  // Marca el componente como standalone
  imports: [FormsModule], // Agrega aquí los módulos que necesites
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  // Aquí puedes agregar lógica específica del perfil si la necesitas
}
