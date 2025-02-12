import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  usuario: string = '';
  senha: string = '';

  constructor(public authService: AuthService,
              private errorHandler: ErrorHandlerService,
              private router: Router
  ) {}

  fazerLogin() {
    this.authService.login(this.usuario, this.senha).subscribe({
      next: () => {
        this.router.navigate(['/clientes/buscar'])
      },
      error: erro => {
      this.errorHandler.handle(erro)
      }
    });
    this.senha = '';
  }


}
