import {Component,OnInit} from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

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
  public usuario_servicio :String ="nombre_usuario";
  constructor(private appComponent: AppComponent,  private router: Router) {}

  ngOnInit() {
    this.comentarios();
  }
comentarios(){  
  
  const output = document.getElementById('face');
  output.innerHTML ='<div id="fb" class="fb-comments" data-href="https://localhost:4200/'+this.usuario_servicio+'" data-width="500" data-numposts="3"></div>';
}
  cerrarSesion() {
    this.appComponent.cerrarSesion();
    this.router.navigate(['login']);
  }

}
