import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { NotificationService } from '../../core/notification.service';
import { ClienteService } from '../cliente.service';
import { ClienteInput } from '../../core/model';

@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrl: './novo-cliente.component.css'
})
export class NovoClienteComponent {
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  cliente = new ClienteInput();
  clienteId: number = 0;

  constructor(
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService,
    private clienteService: ClienteService,
  ){}

  salvar(){
    const clienteInput = {
      nome: this.cliente.nome,
      cpf: this.cliente.cpf
    };
    this.clienteService.novoCliente(clienteInput).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Cliente criado com sucesso!');
        this.resetForm();
        this.close();
      },
      error: erro => {
        this.errorHandler.handle(erro)
      }
    });
  }

  close() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

  resetForm() {
    this.cliente = new ClienteInput();
  }
}
