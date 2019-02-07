import { appRoutingProviders, routing } from './../app-routing.module';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeticionesService } from '../services/peticiones';
import { AppComponent } from '../app.component';
import { Content } from '@angular/compiler/src/render3/r3_ast';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ PeticionesService ]
})
export class LoginComponent implements OnInit {
  public persona: any;


  constructor(private _peticionesService: PeticionesService, private router: Router, private appComponent: AppComponent) {
    this.persona = {
      'correo' : '',
      'clave' : ''
    };

  }

  ngOnInit() {
    if ( this.appComponent.iniciadaSesion() && this.appComponent.obtenerSesion() !== null ) {
      this.router.navigate(['buscar']);
    }
  }

  onLogin(form) {
    console.log(this.persona);
    this._peticionesService.login(this.persona).subscribe(
      response => {
        if ( response !== null) {
          form.reset();
          // Se tiene al informacion acerca del usuario en response
          this.appComponent.grabarSesion(response);
          // Grabada la sesion del usuario en el navegador con this.appComponent.grabarLocalStrorage;
          this.router.navigate(['buscar']);
        } else {
          alert('Usuario no encontrado');
        }
      },
      error => {
        console.log(<any>error);
      });
  }
}
