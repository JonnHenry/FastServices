import { appRoutingProviders, routing } from './../app-routing.module';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(protected router: Router) {}

  ngOnInit() {
  }

  Login(email: string, password: string) {
    console.log('Funciono');
    this.router.navigate(['/buscar']);
  }

}
