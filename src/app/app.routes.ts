import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { AtividadesComponent } from './atividades/atividades.component';
import { LancamentosComponent } from './lancamentos/lancamentos.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'projetos', component: ProjetosComponent },
  { path: 'atividades', component: AtividadesComponent },
  { path: 'lancamentos', component: LancamentosComponent },
  { path: 'relatorios', component: RelatoriosComponent }
];
