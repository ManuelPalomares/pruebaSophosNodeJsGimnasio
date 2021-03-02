import {Injectable} from '@angular/core';
import {HttpClient,HttpResponse,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {GLOBAL} from './globalvariable';
import { Ciudad } from '../models/ciudad';


@Injectable()
export class CiudadService{

    public url :  string ;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;

    }


    getListCiudades(){
        return this._http.get<any>(this.url+'ciudades/getCiudades/');

    }

    saveCiudad(ciudad : Ciudad,token:string){

        let json = JSON.stringify(ciudad);
        let params =json;

          //el header del servidor. 
          var  httpOptions2 = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization' : token
            })
        };


        return this._http.post<any>(this.url+'ciudades/saveCiudad/', params, httpOptions2);
    }
    
    
}