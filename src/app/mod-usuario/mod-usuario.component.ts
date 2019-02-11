import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { PeticionesService } from '../services/peticiones';

@Component({
  selector: 'app-mod-usuario',
  templateUrl: './mod-usuario.component.html',
  styleUrls: ['./mod-usuario.component.css'],
  providers: [ PeticionesService ]

})
export class ModUsuarioComponent implements OnInit {


  public persona: any;

  constructor(private appComponent: AppComponent, private _peticionesService: PeticionesService, private router: Router) {
    if ( this.appComponent.iniciadaSesion() && this.appComponent.obtenerSesion() !== null ) {
      this.persona = appComponent.obtenerSesion();
      this.persona.clave = '';
    } else {
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {
  }

  cerrarSesion() {
    this.appComponent.cerrarSesion();
    this.router.navigate(['login']);
  }
  onUpdate(form) {
    // El correo es el id
    this._peticionesService.updatePersona(this.persona, this.persona.correo).subscribe(
      response => {
        form.reset();
        this.appComponent.grabarSesion(JSON.stringify(response));
        alert('Los datos fueron actualizados correctamente');
      },
      error => {
        console.log(<any>error);
      }
    );

  }

}
