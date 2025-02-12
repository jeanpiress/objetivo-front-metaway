import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ChartModule } from 'primeng/chart';





import { RouterModule, Routes } from '@angular/router';


import { SegurancaModule } from './seguranca/seguranca.module';
import { LoginFormComponent } from './seguranca/login-form/login-form.component';
import { CoreModule } from './core/core.module';
import { ClientesModule } from './clientes/clientes.module';
import { BuscarComponent } from './clientes/buscar/buscar.component';
import { BuscarPetComponent } from './pets/buscar-pets/buscar-pet.component';
import { PetModule } from './pets/pet.module';


const routes: Routes =[
  {path: 'clientes/buscar', component: BuscarComponent},
  {path: 'pets/buscar', component: BuscarPetComponent},
  {path: 'login', component: LoginFormComponent}



]


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BrowserAnimationsModule,
    InputTextModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    InputTextareaModule,
    FormsModule,
    ChartModule,
    CoreModule,
    RouterModule.forRoot(routes),
    SegurancaModule,
    ClientesModule,
    PetModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
