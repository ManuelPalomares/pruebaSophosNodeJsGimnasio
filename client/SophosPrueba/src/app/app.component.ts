import { Component,OnChanges,OnInit } from '@angular/core';
import {Usuario} from './models/usuario';
import {UsuarioService} from './services/usuario.service';
import {CiudadService} from './services/ciudades.service';
import {SedeService} from './services/sedes.services';

import { Ciudad } from './models/ciudad';



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
  public ciudadselect = "";
  public ciudades :any[] = [];
  public sedes : any[] = [];
  public userCreated = '';







  constructor(
    private _usuarioService:UsuarioService,
    private _ciudadServices:CiudadService,
    private _sedeService : SedeService
  ){
   

    this.usuario = new Usuario(-1,'','','','','ROLE_NORM','','','');
    this.usuarioReg = new Usuario(-1,'','','','','ROLE_NORM','','','');

  }

  ngOnInit(){
   this.token ="";
   this.identify= "";
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
          localStorage.setItem("token ",token);
         
          //asociar elemento usuario en session tbn
          this._usuarioService.login(this.usuario,"").subscribe(
            response2=>{
              let userapp = response2;
              localStorage.setItem("identity ",JSON.stringify(userapp));

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
}
