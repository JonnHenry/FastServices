import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUbicacion } from './ubicacion';


@Injectable()
export class UbicacionService{
    private _url ='https://ipapi.co/json/';
    constructor(private http: HttpClient) { }

    getUbicacion(): Observable<IUbicacion[]> {
        console.log(this.http.get<IUbicacion[]>(this._url));
        return this.http.get<IUbicacion[]>(this._url);
    }


}
