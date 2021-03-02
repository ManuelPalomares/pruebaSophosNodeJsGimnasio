import {Injectable} from '@angular/core';
import {HttpClient,HttpResponse,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {GLOBAL} from './globalvariable';
import { Usuario } from '../models/usuario';


@Injectable()
export class UsuarioService{

    public url :  string ;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;

    }


    login(user_tologin : Usuario,getHash :string){

        if(getHash != null){
            user_tologin.gethash = getHash;

        }

        let json = JSON.stringify(user_tologin);
        let params =json;
        //el header del servidor. 
       var  httpOptions2 = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
        };

        return  this._http.post<Usuario>(this.url+'loginUser/', params, httpOptions2);

    
        
    }

    //metodo registar un usuario
    registrarse(user_toReg: Usuario){
        let json = JSON.stringify(user_toReg);
        let params =json;

          //el header del servidor. 
          var  httpOptions2 = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
        };

        return  this._http.post<any>(this.url+'resgister/', params, httpOptions2);

    

    }
    
}