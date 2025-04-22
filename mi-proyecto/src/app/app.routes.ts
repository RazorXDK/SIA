import { Routes } from '@angular/router';

import { PerfilComponent } from './perfil/perfil.component';
import { CursoComponent } from './curso/curso.component'; // <-- Importar el componente
import { AuthComponent } from './auth/auth.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EstablecimientoComponent } from './establecimiento/establecimiento.component';
import { AcademicoComponent } from './academico/academico.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { DocentesComponent } from './docentes/docentes.component';
import { NotasComponent } from './notas/notas.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { WelcomeDashboardComponent } from './dashboard/dashboard.component';

// Importar la guardia de autenticación
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },

  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },

  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: 'establecimiento', component: EstablecimientoComponent, canActivate: [AuthGuard] },
  { path: 'academico', component: AcademicoComponent, canActivate: [AuthGuard] },
  { path: 'alumnos', component: AlumnosComponent, canActivate: [AuthGuard] },
  { path: 'docentes', component: DocentesComponent, canActivate: [AuthGuard] },
  { path: 'notas', component: NotasComponent, canActivate: [AuthGuard] },
  { path: 'configuracion', component: ConfiguracionComponent, canActivate: [AuthGuard] },
  { path: 'cuenta', component: CuentaComponent, canActivate: [AuthGuard] },
  {path: 'dashboard', component: WelcomeDashboardComponent, canActivate: [AuthGuard] },

  { path: 'curso', component: CursoComponent, canActivate: [AuthGuard] }, // <-- Nueva ruta protegida

  { path: '**', redirectTo: 'auth' }
];
