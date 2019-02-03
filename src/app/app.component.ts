import { Component, Injectable } from '@angular/core';

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

  grabarLocalStrorage(llave, objetoGrabarNavegador) {
    // La llave es como se puede recuperar el objeto
    // JSON.stringify() lo que hace es que convierte u objeto Json en un formato de texto
    // Para volverlo a como estaba se emplea JSON.parse()
    localStorage.setItem( llave , JSON.stringify(objetoGrabarNavegador));
  }

  obtenerLocalStorage(llave) {
    // La llave es para poder obtener los valores que esta almacenados en loca storage
    // Se debe de recuperar los valore convertidos en JSON
    this.almacen = JSON.parse(localStorage.getItem(llave));
    return this.almacen;
  }

}
