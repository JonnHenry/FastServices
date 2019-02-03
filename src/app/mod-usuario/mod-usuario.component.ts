import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { PeticionesService } from '../services/peticiones';

@Component({
  selector: 'app-mod-usuario',
  templateUrl: './mod-usuario.component.html',
  styleUrls: ['./mod-usuario.component.css'],
  providers: [ PeticionesService ]

})
export class ModUsuarioComponent implements OnInit {


  public persona: any;

  constructor(private appComponent: AppComponent, private _peticionesService: PeticionesService) {
    this.persona = appComponent.obtenerLocalStorage('sesion');
    this.persona.clave = '';
  }

  ngOnInit() {
  }

  onUpdate(form) {
    // El correo es el id
    this._peticionesService.updatePersona(this.persona, this.persona.correo).subscribe(
      response => {
        form.reset();
        this.appComponent.grabarLocalStrorage('sesion', JSON.stringify(response));
        alert('Los datos fueron actualizados correctamente');
      },
      error => {
        console.log(<any>error);
      }
    );

  }

}
