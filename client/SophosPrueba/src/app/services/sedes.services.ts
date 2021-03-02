import {Injectable} from '@angular/core';
import {HttpClient,HttpResponse,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {GLOBAL} from './globalvariable';
import { Sede } from '../models/sede';


@Injectable()
export class SedeService{

    public url :  string ;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;

    }


    getListSedesByCiudad(idCiudad : any){
        return this._http.get<any>(this.url+'sedes/getListaSedesByCiudad/'+idCiudad);

    }

    saveSede(sede:Sede,token:string){

        let json = JSON.stringify(sede);
        let params =json;

          //el header del servidor. 
          var  httpOptions2 = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization' : token
            })
        };


        return this._http.post<any>(this.url+'sedes/saveSedes/', params, httpOptions2);
    }

    
    
}