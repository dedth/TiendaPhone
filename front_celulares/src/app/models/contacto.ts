export class Contacto {

  id?: number;
  nombre: string;
  email: string;
  asunto: string;
  mensage: string;

  constructor(nombre: string, email: string, asunto: string, mensage: string){
    this.nombre = nombre;
    this.email = email;
    this.asunto = asunto;
    this.mensage = mensage;

  }
}
