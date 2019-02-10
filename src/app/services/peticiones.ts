import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PeticionesService {
    public url: string;

    constructor(
        public _http: HttpClient
    ) {
        this.url = 'http://localhost:3000';
    }

    getPersonas(): Observable<any> {
        return this._http.get(this.url + '/personas');
    }


    addPersona(persona): Observable<any> {
        const params = JSON.stringify(persona);
        const headers = new HttpHeaders().set('Content-Type' , 'application/json');
        return this._http.post(this.url + '/personas/nuevo', params, { headers : headers });
    }

    login(datos): Observable<any> {
      const params = JSON.stringify(datos);
      const headers = new HttpHeaders().set('Content-Type' , 'application/json');
      return this._http.post(this.url + '/login/persona', params, { headers : headers });
  }

    deletePersona(id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url + '/personas/' + id, {headers: headers});
    }

    updatePersona(update, id): Observable<any> {
        const params = JSON.stringify(update);
        const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
        return this._http.put(this.url + '/personas/' + id , params, {headers: headers});
    }

    // Servicios
    addServicio(servicio): Observable<any> {// Agregar un nuevo servicio
      // /servicio/nuevo
      const params = JSON.stringify(servicio);
      const headers = new HttpHeaders().set('Content-Type' , 'application/json');
      return this._http.post(this.url + '/servicio/nuevo', params, { headers : headers });
  }

    getServicios(): Observable<any> {// Agregar un nuevo servicio
      return this._http.get(this.url + '/servicios');
  }

  addServicioPersona(servicioPersona): Observable<any> {
    const params = JSON.stringify(servicioPersona);
    const headers = new HttpHeaders().set('Content-Type' , 'application/json');
    return this._http.post(this.url + '/servicios/nuevo', params, { headers : headers });
}


}
