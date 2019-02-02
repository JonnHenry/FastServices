import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PeticionesService{
    public url : string;

    constructor(
        public _http: HttpClient
    ){
        this.url='http://localhost:3000';
    }

    getPersonas(): Observable<any>{
        return this._http.get(this.url+'/personas');
    }


    addPersona(persona): Observable<any>{
        let params=JSON.stringify(persona);
        console.log('Los parametros son:'+
        params)
        var headers=new HttpHeaders().set('Content-Type' , 'application/json')
        console.log('paso')
        return this._http.post(this.url+'/personas/nuevo',params,{headers : headers});
    }
    
    deletePersona(id): Observable<any>{
        let headers=new HttpHeaders()
        .set('Content-Type', 'application/json')
        return this._http.delete(this.url+'/personas/'+id,{headers: headers});
    }

    updatePersona(update,id): Observable<any>{
        let params=JSON.stringify(update);
        let headers=new HttpHeaders()
        .set('Content-Type', 'application/json');
        return this._http.put(this.url+'/personas/'+id,params,{headers: headers});
    }

}