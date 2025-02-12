import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private notificationService: NotificationService,
  ) { }

  handle(errorResponse: any) {
    let msg: string = '';

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorResponse.error && errorResponse.status >= 400 && errorResponse.status <= 499) {
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      if (errorResponse.error instanceof Object && errorResponse.error.detail) {
        msg = errorResponse.error.detail;
      } else if (errorResponse.error instanceof Object && errorResponse.error.title) {
        msg = errorResponse.error.title;
      }

      console.error('Ocorreu um erro', errorResponse);
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente';
      console.error('Ocorreu um erro ', errorResponse);
    }

    this.notificationService.showError('Erro', msg);
    return throwError(() => errorResponse);
  }

  showCustomError(summary: string, detail: string) {
    this.notificationService.showError(summary, detail);
  }
}
