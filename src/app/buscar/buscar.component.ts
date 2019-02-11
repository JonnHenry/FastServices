import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones';
import { AppComponent } from '../app.component';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['bootstrap.min.css',
    './buscar.component.css',
    './shop_responsive.css',
    './shop_styles.css'],
  providers: [ PeticionesService ]

})
export class BuscarComponent implements OnInit {

  public servicios: any;
  public persona: any;
  public servicioSelecionado = ''; // contiene al elemento selecionado que esta ofreciendo el servicio
  public opcionSeleccionado = '0';
  public servEncontrados = 0; // Indica la cantidad de servicios que se encuentran
  public resultadosBusqueda: any;
  public errorBuscar: any;

  constructor(private appComponent: AppComponent,
    private router: Router,
    private _peticionesService: PeticionesService) {
      this.obtenerServicios();
      if ( this.appComponent.iniciadaSesion() && this.appComponent.obtenerSesion() !== null ) {
        this.persona = appComponent.obtenerSesion();
        this.persona.clave = '';
      } else {
        this.router.navigate(['login']);
      }
     }

  ngOnInit() {
  }

  cerrarSesion() {
    this.appComponent.cerrarSesion();
    this.router.navigate(['login']);
  }

  obtenerServicios() {// obtiene la lista de servicios a consultar
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

  capturar() { // Capturar los datos de un select para poder guardar las imagenes0./
    if (this.opcionSeleccionado === '0') {
      this.servicioSelecionado = '';
      console.log(this.servicioSelecionado);
    } else {
      this.servicioSelecionado = this.servicios[(Number(this.opcionSeleccionado)) - 1].idServicio;
      console.log(this.servicioSelecionado);
    }
  }

  getListServDispo() {
    if ( this.servicioSelecionado !== '') {
      this.capturar();
      this._peticionesService.getListServPersonas(this.servicioSelecionado).subscribe(
        result => {
          this.resultadosBusqueda = result.resulBusqueda;
          this.servEncontrados = result.cantidadServicios;
          this.errorBuscar = result.errorBuscar;
          if (this.servEncontrados === 0) {
            alert('No se encontraron servicios registrados')
          }
      },
      error => {
        console.log(<any>error);
      });

    } else {
      alert('No se ha selecionado un servicio!');
    }

  }

  navigateOtherPage(datos) {
    console.log(datos);
    // tslint:disable-next-line:prefer-const
    let cadenaEcriptada = btoa(datos.correo + ';' + datos.idServicio);
    // tslint:disable-next-line:prefer-const
    let navigationExtras: NavigationExtras = {
      queryParams: {
        'serv': cadenaEcriptada
      }
    };
    /*
      queryParams.get('datos');
    */
    console.log(navigationExtras);
    this.router.navigate(['/solicitar'], navigationExtras);
  }
}
