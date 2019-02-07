import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['bootstrap.min.css',
    './buscar.component.css',
    './shop_responsive.css',
    './shop_styles.css']

})
export class BuscarComponent implements OnInit {

  constructor(private appComponent: AppComponent, private router: Router) { }

  ngOnInit() {
  }

  cerrarSesion() {
    this.appComponent.cerrarSesion();
    this.router.navigate(['login']);
  }

}
