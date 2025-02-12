import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, Observable } from 'rxjs';
import { ErrorHandlerService } from '../core/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private errorHandler: ErrorHandlerService
  ) {
    this.carregarToken();
  }

  login(usuario: string, senha: string): Observable<void> {
    let headers = new HttpHeaders().set('Authorization', 'Basic bWV0YXdheS13ZWI6d2ViMTIz');
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post<any>(this.oauthUrl, body, { headers, withCredentials: true })
  .pipe(
    map(response => {
      this.armazenarToken(response.access_token);
    }),
    catchError(error => {
      console.error('Erro na autenticação:', error);
      if (error.status === 400 && error.error.error === 'invalid_grant') {
        this.errorHandler.showCustomError('Erro de autenticação', 'Usuário inexistente ou senha inválida');
        return new Observable<void>();
      }

      return this.errorHandler.handle(error);
    })
  );
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    } else {
      console.log('Nenhum token encontrado no localStorage.');
    }
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    return token;
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    return token ? this.jwtHelper.isTokenExpired(token) : true;
  }

  logout() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  temPermissao(permissao: string){
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  mesmoUsuario(clienteId: any){
    return this.jwtPayload.id == clienteId;
  }

  usuarioId(){
    return this.jwtPayload.id;
  }

  isAccessTokenInvalido(){
    const token = localStorage.getItem('token')

    return !token || this.jwtHelper.isTokenExpired(token);
  }
}
