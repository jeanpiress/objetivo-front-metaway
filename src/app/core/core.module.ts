import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TreeModule } from 'primeng/tree';


import { RouterModule } from '@angular/router';

import { JwtModule } from '@auth0/angular-jwt';

import { NavBarComponent } from './nav-bar/nav-bar.component';

import { ErrorHandlerService } from './error-handler.service';
import { NotificationService } from './notification.service';
import { AuthService } from '../seguranca/auth.service';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    RouterModule,
    TreeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    MessageService,
    ConfirmationService,
    ErrorHandlerService,
    NotificationService,
    AuthService
  ],
  exports: [
    NavBarComponent,
    ToastModule,
    ConfirmDialogModule
  ]
})
export class CoreModule { }
