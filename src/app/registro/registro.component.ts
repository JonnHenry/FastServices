import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { PeticionesService } from '../services/peticiones'

import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [ PeticionesService ]
})
export class RegistroComponent implements OnInit {

  public persona: any;
  private user: SocialUser;
  private 

  constructor(private authService: AuthService,private _peticionesService: PeticionesService) {
    this.persona = {
      'nombre' : '',
      'apellido' : '',
      'correo' : '',
      'clave' : '',
      'urlFoto' : '',
      'provincia' : '',
      'ciudad' : ''
    };
   }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    console.log(this.user)
    var nomb=this.user.name.split(' ');
    this.persona.nombre=nomb[0];
    this.persona.apellido=nomb[1];
    this.persona.correo=this.user.email;
    this.persona.urlFoto=this.user.photoUrl;
    console.log(this.persona)
  }

  onLogin(form) { 
    console.log(this.persona);
    this._peticionesService.addPersona(this.persona).subscribe(
      response=>{
        form.reset();
        alert(response.respuesta);
      },
      error=>{
        console.log(<any>error);
      });
    
  }

  mostrarClave() {
    
  }
}
