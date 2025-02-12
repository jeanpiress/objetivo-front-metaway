import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _hideNavBar = new BehaviorSubject<boolean>(false);
  hideNavBar$ = this._hideNavBar.asObservable();

  constructor(private messageService: MessageService) {}

  showSuccess(summary: string, detail: string) {
    this.messageService.add({ severity: 'success', summary, detail });
  }

  showError(summary: string, detail: string) {
    this.messageService.add({ severity: 'error', summary, detail });
  }

  hideNavBar(hide: boolean) {
    this._hideNavBar.next(hide);
  }
}
