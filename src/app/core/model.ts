export class ClienteInput {
  nome: string = ' ';
  cpf: string = ' ';
}

export class ClienteId {
  id: number = 0;
}

export class RacaId {
  id: number = 0;
}

export class Raca {
  id: number = 0;
  nome: string = ' ';
}

export class Cliente {
  id: number = 0;
  nome: string = ' ';
  cpf: string = ' ';
}

export class Pet {
  id: number = 0;
  nome: string = ' ';
  cliente: Cliente = new Cliente();
  raca: RacaId = new RacaId();
  dataNascimento: Date = new Date();
}

export class PetInput {
  nome: string = ' ';
  cliente: ClienteId = new ClienteId();
  raca: RacaId = new RacaId();
  dataNascimento: Date = new Date();
}
