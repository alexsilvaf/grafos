import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Grafo } from '../models/grafo.model';
import { No } from '../models/no.model';
import { Aresta } from '../models/aresta.model';

@Injectable({ providedIn: 'root' })
export class GrafoService {
  private readonly baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  obterGrafo(): Observable<Grafo> {
    return this.http.get<Grafo>(`${this.baseUrl}/grafo`);
  }

  cadastrarNo(no: No): Observable<No> {
    return this.http.post<No>(`${this.baseUrl}/nos`, no);
  }

  cadastrarAresta(aresta: Aresta): Observable<Aresta> {
    return this.http.post<Aresta>(`${this.baseUrl}/arestas`, aresta);
  }
}
