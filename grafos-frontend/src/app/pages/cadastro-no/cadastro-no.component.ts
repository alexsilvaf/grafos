import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { GrafoService } from '../../services/grafo.service';

@Component({
  selector: 'app-cadastro-no',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-no.component.html',
  styleUrl: './cadastro-no.component.css'
})
export class CadastroNoComponent {
  id = '';
  enviando = false;
  mensagem: string | null = null;
  erro: string | null = null;

  constructor(
    private grafoService: GrafoService,
    private router: Router
  ) {}

  salvar(): void {
    this.mensagem = null;
    this.erro = null;

    if (!this.id.trim()) {
      this.erro = 'Informe o identificador do nó.';
      return;
    }

    this.enviando = true;
    this.grafoService.cadastrarNo({ id: this.id.trim() }).subscribe({
      next: () => {
        this.mensagem = `Nó "${this.id}" cadastrado com sucesso.`;
        this.id = '';
        this.enviando = false;
      },
      error: (err) => {
        this.erro = err?.error?.erro ?? 'Falha ao cadastrar o nó.';
        this.enviando = false;
      }
    });
  }

  voltar(): void {
    this.router.navigate(['']);
  }
}
