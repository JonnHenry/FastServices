import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';

import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public persona: any;
  private user: SocialUser;
  private 

  constructor(private authService: AuthService) {
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

  onLogin() { 
    console.log(this.persona);
    
  }

  mostrarClave() {
    
  }
}
