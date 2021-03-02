import { Component,OnChanges,OnInit } from '@angular/core';
import {Usuario} from './models/usuario';
import {UsuarioService} from './services/usuario.service';
import {CiudadService} from './services/ciudades.service';
import {SedeService} from './services/sedes.services';

import { Ciudad } from './models/ciudad';
import { Sede } from './models/sede';
import { asLiteral } from '@angular/compiler/src/render3/view/util';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsuarioService,CiudadService,SedeService]
})
export class AppComponent implements OnInit{
  title = 'SophosPrueba';
  public usuario :Usuario;
  public usuarioReg : Usuario;
  public identify = "";
  public token = "";
  public errorMessage='';
  public errorMessage2='';
  public errorenCiudad = '';
  public errorenSedes = '';

  public ciudadselect = "";
  public ciudades :any[] = [];
  public sedes : any[] = [];
  public userCreated = '';

  public ciudad :Ciudad;
  public sede  : Sede;






  constructor(
    private _usuarioService:UsuarioService,
    private _ciudadServices:CiudadService,
    private _sedeService : SedeService
  ){
   

    this.usuario = new Usuario(-1,'','','','','ROLE_NORM','','','');
    this.usuarioReg = new Usuario(-1,'','','','','ROLE_NORM','','','');
    this.ciudad = new Ciudad(-1,'');
    this.sede = new Sede(-1,-1,'',0);
  }

  ngOnInit(){
   this.token ='';
   this.identify= '';

   this.recargarSession();
   this.recargarCiudades();


  }

  private recargarSession(){
    this.identify = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
 
  }


  private recargarCiudades(){
    this._ciudadServices.getListCiudades().subscribe(
      response =>{
        let ciudades = response.ciudades;
        this.ciudades = ciudades;
        
      },
      error=>{
 
      }
 
    );
  }
  public onSubmit(){
  
   this._usuarioService.login(this.usuario,'true').subscribe(
     response =>{

        let token = response.token.toString();
        
        this.identify = token;
       


        if(this.identify.length < 0 ){
          this.errorMessage  = "El usuario no esta identificado correctamente";
        }else{
          //crear elemento de session local storage
          localStorage.setItem("token",token);
         
          //asociar elemento usuario en session tbn
          this._usuarioService.login(this.usuario,"").subscribe(
            response2=>{
              let userapp = response2;
              
              localStorage.setItem("identity",JSON.stringify(userapp));

            }
          );

        }

     },
     error => {
       var errormsg = <any> error;
       if(errormsg !=null){
        var showe = false;

        if(errormsg.error != null){
          this.errorMessage =errormsg.error.message;
          showe = true;
        }
        if(errormsg.message != null && !showe){
          this.errorMessage =errormsg.message;
          showe=true;

        }
         console.log(errormsg);
       }
     }
   );

    


  }

 public  cambiarSede(ciudadselect : any){


    let sedeslist = this._sedeService.getListSedesByCiudad(ciudadselect).subscribe(
      response=>{
        this.sedes = response.sedes;
        console.log(this.sedes);
      },
      error=>{

      });
 
    
  }

  public registrarUsuario(){
    
    this._usuarioService.registrarse(this.usuarioReg).subscribe(
      response=>{
      let res = response;
      let message= response.message;
      
      if(message == "ok"){
        this.errorMessage2 ='';
        this.userCreated = 'ok';
      }
      
    },error=> {
      var errormsg = <any> error;
      if(errormsg !=null){
       var showe = false;

       if(errormsg.error != null){
         this.errorMessage2 =errormsg.error.message;
         showe = true;
       }
       if(errormsg.message != null && !showe){
         this.errorMessage2 =errormsg.message;
         showe=true;

       }

       this.userCreated='';

        console.log(errormsg);
      }
    });

  }

  public guardarCiudad(){

    
    this.recargarSession();
    this._ciudadServices.saveCiudad(this.ciudad,this.token).subscribe(
      response=>{
        console.log(response);
        if(response.message =='ok')
          this.recargarCiudades();
      },
      error=>{

        var errormsg = <any> error;
        if(errormsg !=null){
         var showe = false;
  
         if(errormsg.error != null){
           this.errorenCiudad =errormsg.error.message;
           showe = true;
         }
         if(errormsg.message != null && !showe){
           this.errorenCiudad =errormsg.message;
           showe=true;
  
         }
  
         this.userCreated='';
  
          console.log(errormsg);

        }
      }
      );
  }

  public guardarSede(){

    this.recargarSession();

    console.log(this.token);
    this._sedeService.saveSede(this.sede,this.token).subscribe(
      response=>{
        console.log(response);
        if(response.message =='ok')
          alert('Sede Registrada ');
        },
      error=>{

        var errormsg = <any> error;
        if(errormsg !=null){
         var showe = false;
  
         if(errormsg.error != null){
           this.errorenSedes =errormsg.error.message;
           showe = true;
         }
         if(errormsg.message != null && !showe){
           this.errorenSedes =errormsg.message;
           showe=true;
  
         }
  
         this.userCreated='';
  
          console.log(errormsg);

        }
      }
    );

  }

  cerrarSesion(){
    this.token = "";
    this.identify= "";
    localStorage.clear();
  }
}
