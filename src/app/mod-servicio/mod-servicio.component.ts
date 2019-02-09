import { Component, OnInit, NgZone } from '@angular/core';
import { AppComponent } from '../app.component';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mod-servicio',
  templateUrl: './mod-servicio.component.html',
  styleUrls: ['./mod-servicio.component.css'],
})
export class ModServicioComponent implements OnInit {

  private uploader: FileUploader;
  private title: string;

  constructor(private router: Router,
    private appComponent: AppComponent) {
     }

  ngOnInit() {
  }

  cerrarSesion() {
    this.appComponent.cerrarSesion();
    this.router.navigate(['login']);
  }
}
