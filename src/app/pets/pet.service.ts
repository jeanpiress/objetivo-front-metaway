import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService {
petUrl = 'http://localhost:8080/pets'

  constructor(private http: HttpClient) { }

  pesquisarPets(nome: string): Observable<any>{
    let params = new HttpParams()
                .set('nome', nome);

    return this.http.get(`${this.petUrl}`, { params })
  }

  pesquisarPetPorId(id: number): Observable<any>{
    return this.http.get(`${this.petUrl}/${id}`);
  }

  excluir(id: number): Observable<void>{
    return this.http.delete<void>(`${this.petUrl}/${id}`)}

  novoPet(pet: any): Observable<any>{
    return this.http.post(`${this.petUrl}`, pet);
  }

  editarPet(petId: any, pet: any): Observable<any>{
    return this.http.put(`${this.petUrl}/${petId}`, pet);
  }
}
