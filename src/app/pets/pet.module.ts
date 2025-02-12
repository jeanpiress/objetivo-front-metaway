import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { BuscarPetComponent } from './buscar-pets/buscar-pet.component';
import { NovoPetComponent } from './novo-pet/novo-pet.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { EditarPetComponent } from './editar-pet/editar-pet.component';



@NgModule({
  declarations: [BuscarPetComponent, NovoPetComponent, EditarPetComponent],
  imports: [
    CommonModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    TooltipModule,
    ButtonModule,
    DropdownModule,
    InputNumberModule,
    CalendarModule
  ],
  exports: [BuscarPetComponent]
})
export class PetModule { }
