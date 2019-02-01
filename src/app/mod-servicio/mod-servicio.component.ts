import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import {  } from '@types/googlemaps';

@Component({
  selector: 'app-mod-servicio',
  templateUrl: './mod-servicio.component.html',
  styleUrls: ['./mod-servicio.component.css']
})
export class ModServicioComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;


  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line:prefer-const
    let mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId);
  }

}
