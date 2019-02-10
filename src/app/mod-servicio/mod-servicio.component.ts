import { Component, OnInit, NgZone } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { UbicacionService } from '../ubicacion/ubicacion.service';
import * as Leaflet from 'leaflet';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { PeticionesService } from '../services/peticiones';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mod-servicio',
  templateUrl: './mod-servicio.component.html',
  styleUrls: ['./mod-servicio.component.css'],
  providers: [ PeticionesService ]
})
export class ModServicioComponent implements OnInit {
  public ubicaciones = [];
  // Par poder tener las ubicaciones del servicio
  private ciudad: string;
  private provincia: string;
  private latitud: string;
  private longitud: string;
  private enviarServicio: any;
  // fin declaracion de variables
  public servicios: any;
  public servicioSelecionado = ''; // contiene al elemento selecionado que esta ofreciendo el servicio
  public opcionSeleccionado = '0';
  private contador = 0;

  // uploadPercent
  public uploadPercent: Observable<number>;
  public urlImage: Observable<string>;
  public persona: any;
  public agregarServicio: any;
  public descrpcnServicio: string; // Descripcion del servicio

  public urlImagenes  = ''; // Url que va a ser enviadas a la base de datos con los datos de las imagenes

  constructor(private router: Router,
    private appComponent: AppComponent,
    private _ubicacionService: UbicacionService,
    private storage: AngularFireStorage,
    private _peticionesService: PeticionesService) {
    this.obtenerServicios();
    this.agregarServicio = {
      descripcionServicio: ''
    };

      if ( this.appComponent.iniciadaSesion() && this.appComponent.obtenerSesion() !== null ) {
        this.persona = appComponent.obtenerSesion();
      }

    }
    // fin constructor

  ngOnInit() {
    this.enviarServicio = {
      'idPersona' : '',
      'idServOfrece' : '',
      'fotoServicio' : '',
      'latitud' : '',
      'longitud' : '',
      'ciudad' : '',
      'provincia' : '',
      'descripcionServicio': ''
    };
    // Rellenar los servicios que ofrece
    this.findMe();
  }

  pedirSolServ(form) { // pedir solcitud de servicio
    console.log(this.agregarServicio.descripcionServicio);
    this._peticionesService.addServicio(this.agregarServicio).subscribe(
      response => {
        form.reset();
        alert(response.respuesta);
        this.obtenerServicios();
      },
      error => {
        alert(<any>error);
      });
  }

  obtenerServicios() {
    this._peticionesService.getServicios().subscribe(
      result => {
        this.servicios = result;
        console.log(result);
        console.log('Se recupero los datos de una manera correcta');
    },
    error => {
      console.log(<any>error);
    });
  }

  capturar() { // Capturar los datos de un select para poder guardar las imagenes
    // this.servicioSelecionado = this.opcionSeleccionado;
    if (this.opcionSeleccionado === '0') {
      this.servicioSelecionado = '';
      console.log(this.servicioSelecionado);
    } else {
      this.servicioSelecionado = this.servicios[(Number(this.opcionSeleccionado)) - 1].idServicio;
      console.log(this.servicioSelecionado);
    }
  }

  onSelectFile(event) {
    const fileUrl = event.target.files[0];
    if (this.servicioSelecionado !== '' && this.contador !== 3 ) {
      const id = Math.random().toString(36).substring(2);
      const filePath = 'servicios/' + this.persona.correo + '/' + id;
      console.log(filePath);
      const ref = this.storage.ref(filePath);
      console.log('Paso ref');
      console.log('El url del archivo', fileUrl);
      const task = this.storage.upload(filePath, fileUrl);
      console.log('Paso task');
      this.uploadPercent = task.percentageChanges();
      console.log('Paso uploadPercent');
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(url => {
            this.urlImagenes = url + ',' + this.urlImagenes; // El separador es el ;
            alert('Imagen subida con exito!');
            this.contador ++;
            // alert('El contador es: ' + this.contador + ' ' + this.urlImagenes);
          });
      })).subscribe();
      console.log(this.urlImage);
    } else {
        alert('Error no hay ninguna imagen o se excedio el limite, ademas revise que seleciono un servicio');
    }
  }

  addServicio() {
   this.enviarServicio.idPersona = this.persona.correo;
   this.enviarServicio.idServOfrece =  this.servicioSelecionado;
   this.enviarServicio.fotoServicio = this.urlImagenes;
   this.enviarServicio.latitud = this.latitud;
   this.enviarServicio.longitud = this.longitud;
   this.enviarServicio.ciudad = this.ciudad;
   this.enviarServicio.provincia = this.provincia;
   this.enviarServicio.descripcionServicio = this.descrpcnServicio;
   console.log(this.enviarServicio);
   this._peticionesService.addServicioPersona(this.enviarServicio).subscribe(
    response => {
      alert(response.respuesta);
      this.servicioSelecionado = '';
      this.urlImagenes = '';
      this.descrpcnServicio = '';
      this.persona.correo = '';
      this.contador = 0;
      this.router.navigate(['buscar']);
    },
    error => {
      console.log(<any>error);
    });
  }

  cerrarSesion() {
    this.appComponent.cerrarSesion();
    this.router.navigate(['login']);
  }

  findMe() { // Geolocalizacion
    const output = document.getElementById('map');
    this._ubicacionService.getUbicacion().subscribe((data) => {
      this.ubicaciones = data;
      this.ciudad = this.ubicaciones['city'];
      this.provincia = this.ubicaciones['region'];
      this.latitud = this.ubicaciones['latitude'];
      this.longitud = this.ubicaciones['longitude'];
    });

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
