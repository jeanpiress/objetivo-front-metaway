import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Cliente, ClienteInput } from '../../core/model';
import { NotificationService } from '../../core/notification.service';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.css'
})
export class EditarClienteComponent {
  @Input() cliente: any = new Cliente();
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  clienteInput: any = new ClienteInput();

  constructor(
    private clienteService: ClienteService,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService
  ){}

  salvar(){
    this.clienteInput.nome = this.cliente.nome;
    this.clienteInput.cpf = this.cliente.cpf;
    this.clienteService.editarCliente(this.cliente.id, this.clienteInput).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Cliente editado com sucesso!');
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
}
