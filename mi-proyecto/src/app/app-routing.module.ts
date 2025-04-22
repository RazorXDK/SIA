import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PerfilComponent } from './perfil/perfil.component';
import { CursoComponent } from './curso/curso.component'; // <-- Importación añadida
import { ConfiguracionComponent } from './configuracion/configuracion.component';

const routes: Routes = [

  { path: 'perfil', component: PerfilComponent },
  { path: 'curso', component: CursoComponent }, // <-- Nueva ruta
  {path: 'configuracion', component: ConfiguracionComponent },
  { path: '', redirectTo: '/configuracion', pathMatch: 'full' },
  { path: '**', redirectTo: '/configuracion' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
