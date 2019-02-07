import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mod-servicio',
  templateUrl: './mod-servicio.component.html',
  styleUrls: ['./mod-servicio.component.css'],
})
export class ModServicioComponent implements OnInit {

  constructor(private router: Router, private appComponent: AppComponent) { }

  ngOnInit() {

  }

  cerrarSesion() {
    this.appComponent.cerrarSesion();
    this.router.navigate(['login']);
  }
}
