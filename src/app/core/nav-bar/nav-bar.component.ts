import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { AuthService } from '../../seguranca/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  exibindoMenu: boolean = false;
  exibindoRelatorios: boolean = false;
  fotoUsuarioUrl: any = null;
  semFotoUsuarioUrl: any = 'https://csb-cansei-ser-barbeiro-dev.s3.us-east-2.amazonaws.com/Sem_imagem.jpg';

  constructor(private notificationService: NotificationService,
              public auth: AuthService,
              private router: Router
  ) {}

  ngOnInit() {
    this.notificationService.hideNavBar$.subscribe(hide => {
      if (hide) {
        this.exibindoMenu = false;
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
