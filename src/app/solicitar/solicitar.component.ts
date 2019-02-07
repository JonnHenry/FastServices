import {
  Component,
  OnInit
} from '@angular/core';
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

  constructor(private appComponent: AppComponent,  private router: Router) {}

  ngOnInit() {}

  cerrarSesion() {
    this.appComponent.cerrarSesion();
    this.router.navigate(['login']);
  }

}
