import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { GrafoService } from '../../services/grafo.service';

type FormState = 'idle' | 'submitting' | 'success' | 'error';
type ErrorType = 'required' | 'exists' | 'api' | 'internal' | null;

@Component({
  selector: 'app-cadastro-no',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro-no.component.html',
  styleUrl: './cadastro-no.component.css'
})
export class CadastroNoComponent {
  identifier = '';
  formState: FormState = 'idle';
  errorType: ErrorType = null;
  successMessage = '';

  constructor(private readonly grafoService: GrafoService, private readonly router: Router) {}

  get isSubmitting(): boolean {
    return this.formState === 'submitting';
  }

  get hasIdentifier(): boolean {
    return this.identifier.trim().length > 0;
  }

  onIdentifierChange(): void {
    if (this.errorType === 'required' || this.errorType === 'exists') {
      this.errorType = null;
    }
  }

  dismissSuccess(): void {
    this.successMessage = '';
  }

  onSubmit(saveAnother: boolean): void {
    this.errorType = null;
    this.successMessage = '';

    const trimmed = this.identifier.trim();
    if (!trimmed) {
      this.errorType = 'required';
      return;
    }

    this.formState = 'submitting';

    this.grafoService.cadastrarNo({ id: trimmed }).subscribe({
      next: () => {
        this.formState = 'success';
        this.successMessage = `Nó "${trimmed}" cadastrado com sucesso!`;
        sessionStorage.setItem('graph-updated', 'true');

        if (saveAnother) {
          this.identifier = '';
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

  cancel(): void {
    this.router.navigate(['/']);
  }
}
