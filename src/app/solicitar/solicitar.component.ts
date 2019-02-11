import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router, ActivatedRoute } from '@angular/router';
import {  Icon, icon, Marker } from 'leaflet';
import 'leaflet';
import 'leaflet-routing-machine';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeticionesService } from '../services/peticiones';
declare let L;


@Component({
  selector: 'app-solicitar',
  templateUrl: './solicitar.component.html',
  styleUrls: ['./solicitar.component.css',
    './bootstrap.min.css',
    './product_responsive.css',
    './product_styles.css'],
  providers: [ PeticionesService ]
})
export class SolicitarComponent implements OnInit {

  public user: any; // Formato generico para hacer consultas http
  public servicioOfrece = '';
  public datos: any;
  public nombrePerServicio = '';
  public descrServicio = '';
  private latitud = 0;
  public nombre = '';
  public apellido = '';
  private contador = 0;
  private longitud = 0;
  public provincia = '';
  public defaultImagen = 'assets/images/servicios-default.png';
  public imagenes: any;
  public rutaImagenPrincipal = this.defaultImagen;
  public ciudad = '';
  public comentariosFacebook = 'nombre_usuario';

  // Override default Icons


  constructor(private appComponent: AppComponent, private router: Router,
    private route: ActivatedRoute,
    private _peticionesService: PeticionesService) {
    const inforUser = (atob(this.route.snapshot.queryParamMap.get('serv'))).split(';');
    this.user = {
      correo: inforUser[0],
      idServicio: Number(inforUser[1])
    };

   }

   async ngOnInit() {

    this.buscarPersonaServicio(this.user);
    this.buscarPersona(this.user.correo);
    this.buscaDescServicio(this.user.idServicio);
    // tslint:disable-next-line:no-unused-expression
    Marker.prototype.options.icon;

    //this.comentarios();
    // tslint:disable-next-line:no-unused-expression
  }


  async buscarPersonaServicio(userDatos) {// Busca el usuario que ofrece un servicio en base al correo y la contraseña
    this._peticionesService.findUserServ(userDatos).subscribe(
      result => {
        console.log(result);
        this.contador = 0;
        this.comentariosFacebook = result.correo;
        this.comentarios();
        this.latitud = result.latitud;
        this.longitud = result.longitud;
        this.descrServicio = result.descripcionServicio;
        this.provincia = result.provincia;
        this.ciudad = result.ciudad;
        const imagenesResult = result.fotoServicio.split(',');
        if (imagenesResult.length < 3) {
          this.imagenes = imagenesResult;
          for ( this.contador = imagenesResult.length - 1 ; this.contador <= 3; this.contador++) {
            this.imagenes[Number(this.contador)] = this.defaultImagen;
         }
        }
    },
    error => {
      console.log(<any>error);
    });
  }

  async buscarPersona(idUser) { // Busca un usuario en base al correo
    this._peticionesService.getUser(idUser).subscribe(
      result => {
        this.datos = result;
        console.log(this.datos);
        this.nombre = this.datos.nombre;
        this.apellido = this.datos.apellido;
        this.nombrePerServicio = this.nombre + ' ' + this.apellido;
    },
    error => {
      console.log(<any>error);
    });
  }

  async cargarImagen(valor) { // Para poder cargar las imagenes de los servicios
    this.rutaImagenPrincipal = this.imagenes[valor];
  }

  async buscaDescServicio(idServicio) {
    this._peticionesService.findDescripcion(idServicio).subscribe(
      result => {
        this.descrServicio = result.respuesta;
    },
    error => {
      console.log(<any>error);
    });

  }

  async comentarios() {

    const output = document.getElementById('face');
    // tslint:disable-next-line:max-line-length
    output.innerHTML = '<div id="fb" class="fb-comments" data-href="https://localhost:4200/' + this.comentariosFacebook + '" data-width="1000" data-numposts="3"></div>';
  }

  cerrarSesion() {
    this.appComponent.cerrarSesion();
    this.router.navigate(['login']);
  }

  async onMapReady(map: L.Map) { //leafletMapReady
    this.findMe(map);
  }

  async findMe(map: L.Map) {

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
          L.latLng(this.latitud, this.longitud)
        ]
      }).addTo(map);

    }

    function error() {
      console.log('no se obtuvo la ubicación');
    }

  }

}
