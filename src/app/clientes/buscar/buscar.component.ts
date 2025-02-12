import { Component } from '@angular/core';
import { NotificationService } from '../../core/notification.service';
import { ClienteService } from '../cliente.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent {
  nomeBusca: string = '';
  clientes = [];
  displayNovoCliente: boolean = false;
  displayEditar: boolean = false;
  selectedCliente: any = null;

  constructor(
    private notificationService: NotificationService,
    private clienteService: ClienteService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    public auth: AuthService,
  ) {}

  pesquisar() {
    this.clienteService.pesquisarClientes(this.nomeBusca).subscribe({
      next: (clientes) => {
        this.clientes = clientes;
      },
      error: (erro) => {
        this.errorHandler.handle(erro);
      }
    });
  }

  confirmarExclusao(cliente: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir este cliente?',
      accept: () => {
        this.excluir(cliente);
      }
    });
  }

  excluir(cliente: any) {
    this.clienteService.excluir(cliente.id).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Cliente excluído com sucesso!');
        this.pesquisar();
      },
      error: erro => {
        this.errorHandler.handle(erro);
      }
    });
  }

  novoCliente() {
    this.displayNovoCliente = false;
    this.notificationService.hideNavBar(true);
    setTimeout(() => {
      this.displayNovoCliente  = true;
    }, 0);
  }

  editarCliente(cliente: any) {
    this.displayEditar = false;
    this.notificationService.hideNavBar(true);
    setTimeout(() => {
      this.selectedCliente = cliente;
      this.displayEditar  = true;
    }, 0);
  }
}
