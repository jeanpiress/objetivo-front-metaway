import { Cliente } from './../../core/model';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PetService } from '../../pets/pet.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Pet, PetInput } from '../../core/model';
import { NotificationService } from '../../core/notification.service';
import { ClienteService } from '../../clientes/cliente.service';
import { map } from 'rxjs';
import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-editar-pet',
  templateUrl: './editar-pet.component.html',
  styleUrl: './editar-pet.component.css'
})
export class EditarPetComponent implements OnChanges{
  @Input() pet: any = new Pet();
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();


  petInput: any = new PetInput();
  nomeTutor: string = '';
  clientes: any[] = [];
  clienteSelecionado: any;
  petId: number = 0;

  constructor(
    private petService: PetService,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService,
    private clienteService: ClienteService,
    public auth: AuthService
  ){}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pet'] && this.pet?.cliente?.id) {
      this.carregarClienteSelecionado();
    }
  }
  onInput(event: any) {
    const input = event.target.value;
    if (input.length >= 4) {
      this.carregarClientes();
    } else {
      this.clientes = [];
    }
  }

  salvar(){
    this.montarPetInput();
    this.petService.editarPet(this.pet.id, this.petInput).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Pet editado com sucesso!');
        this.close();
      },
      error: erro => {
        this.errorHandler.handle(erro)
      }
    });
  }

  montarPetInput(){
    this.petInput.nome = this.pet.nome;
    this.petInput.cliente.id = this.clienteSelecionado;
    this.petInput.raca.id = this.pet.raca.id;
    this.petInput.dataNascimento = this.pet.dataNascimento;
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

    carregarClienteSelecionado() {
      this.clienteService.pesquisarClientePorId(this.pet.cliente.id)
        .pipe(
          map((cliente: Cliente) => cliente ? [{ label: cliente.nome, value: cliente.id }] : [])
        )
        .subscribe(clientesFormatados => {
          this.clientes = clientesFormatados;

          if (this.clientes.length > 0) {
            this.clienteSelecionado = this.clientes[0].value;
          }
        });
    }


  close() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

  resetForm() {
    this.pet = new PetInput();
  }
}
