import { Component, OnInit } from '@angular/core';
import { UbicacionService } from './ubicacion.service';
import * as Leaflet from 'leaflet';
@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {
  public ubicaciones=[];
  constructor(private _ubicacionService: UbicacionService){ }

  ngOnInit() {
 
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
