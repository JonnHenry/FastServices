import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import {  Icon, icon, Marker } from 'leaflet';

import 'leaflet';
import 'leaflet-routing-machine';
declare let L;


@Component({
  selector: 'app-solicitar',
  templateUrl: './solicitar.component.html',
  styleUrls: ['./solicitar.component.css',
    './bootstrap.min.css',
    './product_responsive.css',
    './product_styles.css'
  ]
})
export class SolicitarComponent implements OnInit {
  public usuario_servicio: String = "nombre_usuario";

  // Override default Icons


  constructor(private appComponent: AppComponent, private router: Router) { }

  ngOnInit() {
    this.comentarios();
    Marker.prototype.options.icon ;
  }
  comentarios() {

    const output = document.getElementById('face');
    output.innerHTML = '<div id="fb" class="fb-comments" data-href="https://localhost:4200/' + this.usuario_servicio + '" data-width="500" data-numposts="3"></div>';
  }
  cerrarSesion() {
    this.appComponent.cerrarSesion();
    this.router.navigate(['login']);
  }
  onMapReady(map: L.Map) {
    this.findMe(map);
  }

  findMe(map: L.Map) {

    navigator.geolocation.getCurrentPosition(localizacion, error);
    // Obtenemos latitud y longitud
    function localizacion(posicion) {
      const lat = posicion.coords.latitude;
      const lon = posicion.coords.longitude;
      map.setView([lat, lon+0.009100], 15);
      L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Ubicacion',
        maxZoom: 20,
        minZoom: 4
      }).addTo(map);

      L.Routing.control({
        waypoints: [
          L.latLng(lat, lon),
          L.latLng(-2.891705, -79.014396)
        ]
      }).addTo(map);

    }

    function error() {
      console.log("no se obtuvo la ubicación");
    }

  }

}
