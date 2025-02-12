import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { NotificationService } from '../../core/notification.service';
import { AuthService } from '../../seguranca/auth.service';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-buscar-pet',
  templateUrl: './buscar-pet.component.html',
  styleUrl: './buscar-pet.component.css'
})
export class BuscarPetComponent {
nomeBusca: string = '';
  pets = [];
  pet: any;
  displayNovoPet: boolean = false;
  displayEditar: boolean = false;
  selectedPet: any = null;

  constructor(
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private petService: PetService,
    public auth: AuthService,
  ) {}

  pesquisar() {
    this.petService.pesquisarPets(this.nomeBusca).subscribe({
      next: (pets) => {
        this.pets = pets;
      },
      error: (erro) => {
        this.errorHandler.handle(erro);
      }
    });
  }

  pesquisarPetPorId(petId: number) {
    console.log('chamou pesquisarPorId')
    this.petService.pesquisarPetPorId(petId).subscribe({
      next: (pet) => {
        this.pet = pet;
      },
      error: (erro) => {
        this.errorHandler.handle(erro);
      }
    });
  }

  confirmarExclusao(pet: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir este pet?',
      accept: () => {
        this.excluir(pet);
      }
    });
  }

  excluir(pet: any) {
    this.petService.excluir(pet.id).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Pet excluído com sucesso!');
        this.pesquisar();
      },
      error: erro => {
        this.errorHandler.handle(erro);
      }
    });
  }

  novoPet() {
    this.displayNovoPet = false;
    this.notificationService.hideNavBar(true);
    setTimeout(() => {
      this.displayNovoPet  = true;
    }, 0);
  }

  editarPet(pet: any) {
    this.displayEditar = false;
    this.notificationService.hideNavBar(true);
    setTimeout(() => {
      this.selectedPet = pet;
      this.displayEditar  = true;
    }, 0);
  }
}
