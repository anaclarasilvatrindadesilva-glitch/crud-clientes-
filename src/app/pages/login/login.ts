import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  userName: string;
  // Construção de uma rota
  constructor(private rota: Router){}

  login(){
    sessionStorage.setItem('user', this.userName);
    this.rota.navigate(['home']);
  }
}
