import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { GrafoService } from '../../services/grafo.service';
import { No } from '../../models/no.model';

@Component({
  selector: 'app-cadastro-aresta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-aresta.component.html',
  styleUrl: './cadastro-aresta.component.css'
})
export class CadastroArestaComponent implements OnInit {
  nos: No[] = [];
  origem = '';
  destino = '';
  custo: number | null = null;

  carregandoNos = true;
  enviando = false;
  mensagem: string | null = null;
  erro: string | null = null;

  constructor(
    private grafoService: GrafoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarNos();
  }

  private carregarNos(): void {
    this.grafoService.obterGrafo().subscribe({
      next: (grafo) => {
        this.nos = grafo.nos;
        this.carregandoNos = false;
      },
      error: () => {
        this.erro = 'Não foi possível carregar os nós disponíveis.';
        this.carregandoNos = false;
      }
    });
  }

  salvar(): void {
    this.mensagem = null;
    this.erro = null;

    if (!this.origem || !this.destino || this.custo === null) {
      this.erro = 'Preencha todos os campos.';
      return;
    }
    if (this.origem === this.destino) {
      this.erro = 'Origem e destino devem ser diferentes.';
      return;
    }
    if (isNaN(this.custo)) {
      this.erro = 'Custo inválido.';
      return;
    }

    this.enviando = true;
    this.grafoService.cadastrarAresta({
      origem: this.origem,
      destino: this.destino,
      custo: this.custo
    }).subscribe({
      next: () => {
        this.mensagem = `Aresta ${this.origem} → ${this.destino} cadastrada com sucesso.`;
        this.origem = '';
        this.destino = '';
        this.custo = null;
        this.enviando = false;
      },
      error: (err) => {
        this.erro = err?.error?.erro ?? 'Falha ao cadastrar a aresta.';
        this.enviando = false;
      }
    });
  }

  voltar(): void {
    this.router.navigate(['']);
  }

  irParaCadastroDeNos(): void {
    this.router.navigate(['/cadastro-no']);
  }

  get nosInsuficientes(): boolean {
    return !this.carregandoNos && this.nos.length < 2;
  }
}
