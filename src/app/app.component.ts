import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  constructor(private messageService: MessageService,
              private router: Router,
              private jwtHelper: JwtHelperService,
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (!token || this.jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary:'Success', detail:'Message Content'});
  }

  exibindoNavBar(){
    return this.router.url !== '/login';
  }
}
