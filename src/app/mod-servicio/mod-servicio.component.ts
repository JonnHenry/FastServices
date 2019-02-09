import { Component, OnInit, NgZone } from '@angular/core';
import { AppComponent } from '../app.component';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { Router } from '@angular/router';
import { UbicacionService } from '../ubicacion/ubicacion.service';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-mod-servicio',
  templateUrl: './mod-servicio.component.html',
  styleUrls: ['./mod-servicio.component.css'],
})
export class ModServicioComponent implements OnInit {
  public ubicaciones=[];
  private uploader: FileUploader;
  private title: string;

  constructor(private router: Router,
    private appComponent: AppComponent,private _ubicacionService: UbicacionService) {
     }

  ngOnInit() {
  }

  cerrarSesion() {
    this.appComponent.cerrarSesion();
    this.router.navigate(['login']);
  }
  findMe(){
    var output = document.getElementById('map');
    this._ubicacionService.getUbicacion()
  .subscribe(data => this.ubicaciones =data);
  

    // Verificar si soporta geolocalizacion
    if (navigator.geolocation) {
      output.innerHTML = "<p>Geolocalizacion Activa</p>";
    }else{
      output.innerHTML = "<p>Tu navegador no soporta Geolocalizacion</p>";
    }


    //Obtenemos latitud y longitud
    function localizacion(posicion){

      var latitude = posicion.coords.latitude;
      var longitude = posicion.coords.longitude;
     
      output.innerHTML ="<div>Lat: " + latitude+",  Long: "+longitude+"</div>";
      
      
      drawMap(latitude,longitude);
    }

    function error(){
      output.innerHTML = "<p>No se pudo obtener tu ubicación</p>";
    }
    function drawMap(lat,lon) {
      let mapa = Leaflet.map('mapa').setView([lat,lon], 15);
      Leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Ubicacion',     
        maxZoom: 18,
        minZoom: 6
      }).addTo(mapa);
      Leaflet.marker([lat, lon]).addTo(mapa)
      .bindPopup('Mi Ubicación')
      .openPopup();
  
      //alert on location error
      function onLocationError(e) {
        alert(e.message);
      }
  
      mapa.on('locationerror', onLocationError);
    }
    navigator.geolocation.getCurrentPosition(localizacion,error);   
  }
}
