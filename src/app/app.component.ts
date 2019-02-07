import {
  Component,
  Injectable
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {

  private almacen: any;

  constructor() {

  }

  grabarSesion(objetoGrabarNavegador) {
    // La llave es como se puede recuperar el objeto
    // JSON.stringify() lo que hace es que convierte u objeto Json en un formato de texto
    // Para volverlo a como estaba se emplea JSON.parse()
    localStorage.setItem('sesion', JSON.stringify(objetoGrabarNavegador));
  }

  obtenerSesion() {
    if (localStorage.getItem('sesion') === 'Null') {
      return null;
    } else {
      this.almacen = JSON.parse(localStorage.getItem('sesion'));
      return this.almacen;
    }
    // La llave es para poder obtener los valores que esta almacenados en loca storage
    // Se debe de recuperar los valore convertidos en JSON
  }

  cerrarSesion() {
    localStorage.setItem('sesion', 'Null');
  }

  iniciadaSesion() {
    if (localStorage.getItem('sesion') === 'Null') { // Retorna true si hay iniciada una sesion, false en caso contrario
      return false;
    } else {
      return true;
    }
  }
}
