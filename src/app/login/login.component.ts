import { appRoutingProviders, routing } from './../app-routing.module';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeticionesService } from '../services/peticiones';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ PeticionesService ]
})
export class LoginComponent implements OnInit {
  public persona: any;


  constructor(private _peticionesService: PeticionesService, private router: Router) {
    this.persona = {
      'correo' : '',
      'clave' : ''
    };
  }

  ngOnInit() {
  }

  onLogin(form) {
    console.log(this.persona);
    this._peticionesService.login(this.persona).subscribe(
      response => {
        form.reset();
        console.log(response);
        this.router.navigate(['buscar']);
      },
      error => {
        console.log(<any>error);
      });
  }

}
