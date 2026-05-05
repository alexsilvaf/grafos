import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { DataSet } from 'vis-data';
import { Network } from 'vis-network';
import { Grafo } from '../../models/grafo.model';

@Component({
  selector: 'app-graph-visualization',
  standalone: true,
  template: `<div #container class="graph-canvas" [style.height.px]="height"></div>`,
  styles: [`
    .graph-canvas {
      width: 100%;
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: calc(var(--radius) - 2px);
    }
  `]
})
export class GraphVisualizationComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() data: Grafo = { nos: [], arestas: [] };
  @Input() height = 600;
  @Output() renderError = new EventEmitter<Error>();

  @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;

  private network?: Network;

  ngAfterViewInit(): void {
    this.render();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.container) {
      this.render();
    }
  }

  ngOnDestroy(): void {
    this.network?.destroy();
  }

  private render(): void {
    try {
      const nodes = new DataSet(
        (this.data.nos ?? []).map(n => ({
          id: n.id,
          label: n.id,
          shape: 'circle',
          color: {
            background: '#4f46e5',
            border: '#ffffff',
            highlight: { background: '#4338ca', border: '#ffffff' }
          },
          font: { color: '#ffffff', size: 14, face: 'Segoe UI, Roboto, sans-serif' },
          borderWidth: 2
        }))
      );

      const edges = new DataSet(
        (this.data.arestas ?? []).map((a, idx) => ({
          id: `${a.origem}->${a.destino}-${idx}`,
          from: a.origem,
          to: a.destino,
          label: String(a.custo),
          arrows: 'to',
          color: { color: '#999999', highlight: '#666666' },
          font: { color: '#666666', size: 12, strokeWidth: 4, strokeColor: '#ffffff' },
          smooth: { enabled: true, type: 'dynamic', roundness: 0.5 }
        }))
      );

      const options = {
        autoResize: true,
        physics: {
          enabled: true,
          solver: 'forceAtlas2Based',
          forceAtlas2Based: { gravitationalConstant: -50, springLength: 150 },
          stabilization: { iterations: 200 }
        },
        interaction: {
          dragNodes: true,
          dragView: true,
          zoomView: true,
          hover: true
        },
        nodes: { size: 20 }
      };

      this.network?.destroy();
      this.network = new Network(this.container.nativeElement, { nodes, edges } as any, options as any);
    } catch (err) {
      this.renderError.emit(err instanceof Error ? err : new Error(String(err)));
    }
  }
}
