import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { GrafoService } from '../../services/grafo.service';
import { No } from '../../models/no.model';

type FormState = 'idle' | 'loading' | 'submitting' | 'success' | 'error' | 'insufficient-nodes';
type ErrorType = 'required' | 'same-node' | 'invalid-cost' | 'exists' | 'api' | 'internal' | null;

@Component({
  selector: 'app-cadastro-aresta',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro-aresta.component.html',
  styleUrl: './cadastro-aresta.component.css'
})
export class CadastroArestaComponent implements OnInit {
  nos: No[] = [];
  origem = '';
  destino = '';
  custo = '';
  formState: FormState = 'loading';
  errorType: ErrorType = null;
  successMessage = '';

  constructor(private readonly grafoService: GrafoService, private readonly router: Router) {}

  ngOnInit(): void {
    this.loadNodes();
  }

  loadNodes(): void {
    this.formState = 'loading';
    this.grafoService.obterGrafo().subscribe({
      next: data => {
        this.nos = data.nos ?? [];
        this.formState = this.nos.length < 2 ? 'insufficient-nodes' : 'idle';
      },
      error: () => {
        this.formState = 'error';
        this.errorType = 'api';
      }
    });
  }

  get isSubmitting(): boolean {
    return this.formState === 'submitting';
  }

  get hasAllFields(): boolean {
    return !!this.origem && !!this.destino && !!this.custo;
  }

  get errorOrigem(): string | null {
    if (this.errorType === 'required' && !this.origem) {
      return 'Selecione um nó de origem';
    }
    return null;
  }

  get errorDestino(): string | null {
    if (this.errorType === 'required' && !this.destino) {
      return 'Selecione um nó de destino';
    }
    if (this.errorType === 'same-node') {
      return 'Os nós de origem e destino devem ser diferentes';
    }
    return null;
  }

  get errorCusto(): string | null {
    if (this.errorType === 'required' && !this.custo) {
      return 'O custo é obrigatório';
    }
    if (this.errorType === 'invalid-cost') {
      return 'Digite um valor numérico válido maior ou igual a zero';
    }
    if (this.errorType === 'exists') {
      return 'Esta aresta já existe';
    }
    return null;
  }

  clearFieldError(): void {
    this.errorType = null;
  }

  dismissSuccess(): void {
    this.successMessage = '';
  }

  navigateToCreateNode(): void {
    this.router.navigate(['/cadastro-no']);
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  onSubmit(saveAnother: boolean): void {
    this.errorType = null;
    this.successMessage = '';

    if (!this.origem || !this.destino || !this.custo) {
      this.errorType = 'required';
      return;
    }
    if (this.origem === this.destino) {
      this.errorType = 'same-node';
      return;
    }
    const custoNum = parseFloat(this.custo);
    if (Number.isNaN(custoNum) || custoNum < 0) {
      this.errorType = 'invalid-cost';
      return;
    }

    this.formState = 'submitting';

    const origem = this.origem;
    const destino = this.destino;

    this.grafoService.cadastrarAresta({ origem, destino, custo: custoNum }).subscribe({
      next: () => {
        this.formState = 'success';
        this.successMessage = `Aresta de "${origem}" para "${destino}" com custo ${custoNum} cadastrada com sucesso!`;
        sessionStorage.setItem('graph-updated', 'true');

        if (saveAnother) {
          this.origem = '';
          this.destino = '';
          this.custo = '';
          this.errorType = null;
          setTimeout(() => {
            this.formState = 'idle';
            this.successMessage = '';
          }, 3000);
        } else {
          setTimeout(() => this.router.navigate(['/']), 2000);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.formState = 'error';
        if (err.status === 409) {
          this.errorType = 'exists';
        } else if (err.status === 0) {
          this.errorType = 'api';
        } else {
          this.errorType = 'internal';
        }
      }
    });
  }
}
