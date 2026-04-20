import { Routes } from '@angular/router';
import { GrafoComponent } from './pages/grafo/grafo.component';
import { CadastroNoComponent } from './pages/cadastro-no/cadastro-no.component';
import { CadastroArestaComponent } from './pages/cadastro-aresta/cadastro-aresta.component';

export const routes: Routes = [
  { path: '', component: GrafoComponent },
  { path: 'cadastro-no', component: CadastroNoComponent },
  { path: 'cadastro-aresta', component: CadastroArestaComponent },
  { path: '**', redirectTo: '' }
];
