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

    
    
}