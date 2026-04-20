import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataSet, Network, Node, Edge } from 'vis-network/standalone';

import { GrafoService } from '../../services/grafo.service';
import { Grafo } from '../../models/grafo.model';

@Component({
  selector: 'app-grafo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './grafo.component.html',
  styleUrl: './grafo.component.css'
})
export class GrafoComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLDivElement>;

  grafo: Grafo | null = null;
  carregando = true;
  erro: string | null = null;

  constructor(private grafoService: GrafoService) {}

  ngOnInit(): void {
    this.carregarGrafo();
  }

  ngAfterViewInit(): void {
    if (this.grafo) {
      this.renderizarGrafo();
    }
  }

  carregarGrafo(): void {
    this.carregando = true;
    this.erro = null;
    this.grafoService.obterGrafo().subscribe({
      next: (grafo) => {
        this.grafo = grafo;
        this.carregando = false;
        setTimeout(() => this.renderizarGrafo(), 0);
      },
      error: () => {
        this.erro = 'Não foi possível carregar o grafo. Verifique se a API está disponível.';
        this.carregando = false;
      }
    });
  }

  private renderizarGrafo(): void {
    if (!this.canvas || !this.grafo) {
      return;
    }

    const nodes = new DataSet<Node>(
      this.grafo.nos.map(n => ({ id: n.id, label: n.id }))
    );
    const edges = new DataSet<Edge>(
      this.grafo.arestas.map(a => ({
        from: a.origem,
        to: a.destino,
        label: a.custo.toString(),
        arrows: 'to'
      }))
    );

    new Network(
      this.canvas.nativeElement,
      { nodes, edges },
      {
        nodes: { shape: 'circle', color: '#2962ff', font: { color: '#fff' } },
        edges: { color: '#555', font: { align: 'middle' } },
        physics: { stabilization: true }
      }
    );
  }

  get grafoVazio(): boolean {
    return !!this.grafo && this.grafo.nos.length === 0 && this.grafo.arestas.length === 0;
  }
}
