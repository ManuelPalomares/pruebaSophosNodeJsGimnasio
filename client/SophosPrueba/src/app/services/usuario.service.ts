import {Injectable} from '@angular/core';
import {HttpClient,HttpResponse,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {GLOBAL} from './globalvariable';
import { Usuario } from '../models/usuario';


@Injectable()
export class UsuarioService{

    public url :  string ;
    public identity : any;
    public token  : any;
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

    getIdentity(){
        var strjson :any=localStorage.getItem('identity');

        let identity = JSON.parse(strjson);

        if(identity != 'undefined'){
            this.identity = identity;
        }
        else{
            this.identity = null;
        }
        return this.identity;
    }

    getToken(){
        var str :any=localStorage.getItem('token');
        console.log(str);
        let token = str;

        if(token != 'undefined'){
            this.token = token;
        }
        else{
            this.token = null;
        }
        return this.token;
    }
    
}