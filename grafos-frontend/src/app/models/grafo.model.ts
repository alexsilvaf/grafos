import { No } from './no.model';
import { Aresta } from './aresta.model';

export interface Grafo {
  nos: No[];
  arestas: Aresta[];
}
