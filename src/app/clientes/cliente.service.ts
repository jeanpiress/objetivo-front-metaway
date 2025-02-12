import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  clienteUrl = 'http://localhost:8080/clientes'

  constructor(private http: HttpClient) { }

  pesquisarClientes(nome: string): Observable<any>{
    let params = new HttpParams()
                .set('nome', nome);

    return this.http.get(`${this.clienteUrl}`, { params })
  }

  pesquisarClientePorId(id: number): Observable<any>{
    return this.http.get(`${this.clienteUrl}/${id}`);
  }

  excluir(id: number): Observable<void>{
    return this.http.delete<void>(`${this.clienteUrl}/${id}`)}

  novoCliente(cliente: any): Observable<any>{
    return this.http.post(`${this.clienteUrl}`, cliente);
  }

  editarCliente(clienteId: any, cliente: any): Observable<any>{
    return this.http.put(`${this.clienteUrl}/${clienteId}`, cliente);
  }
}
