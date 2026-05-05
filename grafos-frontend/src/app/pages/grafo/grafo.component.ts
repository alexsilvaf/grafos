import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GrafoService } from '../../services/grafo.service';
import { Grafo } from '../../models/grafo.model';
import { GraphVisualizationComponent } from '../../components/graph-visualization/graph-visualization.component';

type ViewState = 'loading' | 'empty' | 'loaded' | 'error' | 'render-error';

@Component({
  selector: 'app-grafo',
  standalone: true,
  imports: [GraphVisualizationComponent],
  templateUrl: './grafo.component.html',
  styleUrl: './grafo.component.css'
})
export class GrafoComponent implements OnInit {
  state: ViewState = 'loading';
  grafo: Grafo = { nos: [], arestas: [] };
  needsRefresh = false;

  constructor(private readonly grafoService: GrafoService, private readonly router: Router) {}

  ngOnInit(): void {
    this.loadGraph();
    this.checkForUpdates();
  }

  @HostListener('window:focus')
  onWindowFocus(): void {
    this.checkForUpdates();
  }

  loadGraph(): void {
    this.state = 'loading';
    this.grafoService.obterGrafo().subscribe({
      next: data => {
        this.grafo = { nos: data.nos ?? [], arestas: data.arestas ?? [] };
        this.state = this.grafo.nos.length === 0 ? 'empty' : 'loaded';
        this.needsRefresh = false;
      },
      error: () => {
        this.state = 'error';
      }
    });
  }

  onRenderError(): void {
    this.state = 'render-error';
  }

  navigateToCreateNode(): void {
    this.router.navigate(['/cadastro-no']);
  }

  navigateToCreateEdge(): void {
    this.router.navigate(['/cadastro-aresta']);
  }

  dismissRefresh(): void {
    this.needsRefresh = false;
  }

  private checkForUpdates(): void {
    if (sessionStorage.getItem('graph-updated') === 'true') {
      this.needsRefresh = true;
      sessionStorage.removeItem('graph-updated');
    }
  }
}
