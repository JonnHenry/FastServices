import { Component, OnInit, NgZone } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { UbicacionService } from '../ubicacion/ubicacion.service';
import * as Leaflet from 'leaflet';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { PeticionesService } from '../services/peticiones';

@Component({
  selector: 'app-mod-servicio',
  templateUrl: './mod-servicio.component.html',
  styleUrls: ['./mod-servicio.component.css'],
  providers: [ PeticionesService ]
})
export class ModServicioComponent implements OnInit {
  public ubicaciones = [];
  public servicios: any;
  public servicioSelecionado: string; // contiene al elemento selecionado que esta ofreciendo el servicio
  // uploadPercent
  public uploadPercent: Observable<number>;
  public urlImage: Observable<string>;
  public persona: any;
  public agregarServicio: any;
  public fileUrl = ''; // Url de la imagen que se desea cargar (estq url es del equipo del usuario)

  constructor(private router: Router,
    private appComponent: AppComponent,
    private _ubicacionService: UbicacionService,
    private storage: AngularFireStorage,
    private _peticionesService: PeticionesService) {

    this.agregarServicio = {
      descripcionServicio: 'Hola esto es de prueba'
    };

      if ( this.appComponent.iniciadaSesion() && this.appComponent.obtenerSesion() !== null ) {
        this.persona = appComponent.obtenerSesion();
      }

    }
    // fin constructor

  ngOnInit() {
    // Rellenar los servicios que ofrece
    this.findMe();
  }

  pedirSolServ(formSolServicio) {
    alert('Esto es un mensaje de prueba');
  }


  onUpload() {
    if ( this.fileUrl === '' || this.servicioSelecionado === '') {
      alert('Error no hay ninguna imagen para subir');
    } else {
    const id = Math.random().toString(36).substring(2);
    const filePath = 'servicios/' + this.persona.correo + this.servicioSelecionado;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.fileUrl);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
    console.log(this.urlImage);
    this.fileUrl = '';
    alert('Imagen subida con exito!');
    }
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.fileUrl = event.target.result;
      };
    }
  }

  cerrarSesion() {
    this.appComponent.cerrarSesion();
    this.router.navigate(['login']);
  }

  findMe() {
    const output = document.getElementById('map');
    this._ubicacionService.getUbicacion()
  .subscribe(data => this.ubicaciones = data);

    // Verificar si soporta geolocalizacion
    if (navigator.geolocation) {
      output.innerHTML = '<p> Geolocalizacion Activa </p>';
    } else {
      output.innerHTML = '<p>Tu navegador no soporta Geolocalizacion</p>';
    }

    // Obtenemos latitud y longitud
    function localizacion(posicion) {

      const latitude = posicion.coords.latitude;
      const longitude = posicion.coords.longitude;

      output.innerHTML = '<label>Lat: <i>' + latitude + '</i>, Long: <i/>' + longitude + '<i/></label>';


      drawMap(latitude, longitude);
    }

    function error() {
      output.innerHTML = '<p>No se pudo obtener tu ubicación</p>';
    }

    function drawMap(lat, lon) {
      const mapa = Leaflet.map('mapa').setView([lat, lon], 15);
      Leaflet.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Ubicacion',
        maxZoom: 20,
        minZoom: 4
      }).addTo(mapa);
      Leaflet.marker([lat, lon]).addTo(mapa)
      .bindPopup('Mi Ubicación')
      .openPopup();

      function onLocationError(e) {
        alert(e.message);
      }

      mapa.on('locationerror', onLocationError);
    }
    navigator.geolocation.getCurrentPosition(localizacion, error);
  }


}
