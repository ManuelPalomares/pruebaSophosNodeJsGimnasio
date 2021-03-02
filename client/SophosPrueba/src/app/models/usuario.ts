export class Usuario{

    constructor(
        public id : number,
        public login : string,
        public nombre : string,
        public email  : string,
        public password: string,
        public role    : string,
        public gethash : String,
        public token : String,
        public idSede : String

    ){
        
    }
}