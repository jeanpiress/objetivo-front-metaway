import { ClienteService } from './../../clientes/cliente.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { NotificationService } from '../../core/notification.service';
import { PetService } from '../pet.service';
import { Cliente, PetInput } from '../../core/model';
import { map } from 'rxjs';

@Component({
  selector: 'app-novo-pet',
  templateUrl: './novo-pet.component.html',
  styleUrl: './novo-pet.component.css'
})
export class NovoPetComponent{
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  nomeTutor: string = '';
  clientes: any[] = [];
  clienteSelecionado: any;
  pet = new PetInput();
  petId: number = 0;

  constructor(
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService,
    private petService: PetService,
    private clienteService: ClienteService
  ){}

  onInput(event: any) {
    const input = event.target.value;
    if (input.length >= 4) {
      this.carregarClientes();
    } else {
      this.clientes = [];
    }
  }

  salvar(){
    this.pet.cliente.id = this.clienteSelecionado;
    this.petService.novoPet(this.pet).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Pet criado com sucesso!');
        this.resetForm();
        this.close();
      },
      error: erro => {
        this.errorHandler.handle(erro)
      }
    });
  }

  carregarClientes() {
    if (this.nomeTutor.length >= 3) {
    this.clienteService.pesquisarClientes(this.nomeTutor)
      .pipe(
        map((clientes: Cliente[]) =>
          clientes.map(cliente => ({ label: cliente.nome, value: cliente.id }))
        )
      )
      .subscribe(clientesFormatados => {
        this.clientes = clientesFormatados;

        if (this.clientes.length > 0) {
          this.clienteSelecionado = this.clientes[0].value;
        }
      });
    }
  }

  close() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

  resetForm() {
    this.pet = new PetInput();
    this.nomeTutor = '';
    this.clientes = [];
    this.clienteSelecionado = null;
  }
}
